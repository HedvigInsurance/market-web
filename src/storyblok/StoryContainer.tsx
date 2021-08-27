import { Container } from 'constate'
import React, { PureComponent } from 'react'
import { BaseBlockProps, MarkdownHtmlComponent } from '../blocks/BaseBlockProps'
import { ErrorBlock } from '../components/blockHelpers'
import { Image } from '../utils/storyblok'

export interface SeoContent {
  robots: 'index' | 'noindex'
  seo_meta_title: string
  seo_meta_description: string
  seo_meta_og_title: string
  seo_meta_og_description: string
  seo_meta_og_image: Image
}

export interface HrefLang {
  hreflang_sv_se?: LinkComponent
  hreflang_en_se?: LinkComponent
  hreflang_no_no?: LinkComponent
  hreflang_en_no?: LinkComponent
}

export interface Alternate {
  full_slug: string
  id: string
  is_folder: boolean
  name: string
  parent_id: string
  published: boolean
  slug: string
}

export interface Story {
  name: string
  created_at: string
  first_published_at: string
  published_at: string
  id: string
  uuid: string
  slug: string
  full_slug: string
  tag_list?: ReadonlyArray<string>
  lang?: string
  alternates?: ReadonlyArray<Alternate>

  content: {
    _uid: string
    page_title: string
    component: 'page' | 'global'
  }
}

export interface BodyStory extends Story {
  content: SeoContent &
    HrefLang & {
      _uid: string
      page_title: string
      component: 'page'
      body: ReadonlyArray<BaseBlockProps>
      hide_footer?: boolean
    }
}

export interface WithStory<TStoryType extends Story> {
  story?: TStoryType
}

export interface LinkComponent {
  id: string
  url: string
  linktype: 'story' | 'url'
  cached_url: string // use this
}

export interface MenuItem {
  _uid: string
  label: string
  link: LinkComponent
  component: 'menu_item'
  menu_items?: ReadonlyArray<MenuItem>
}

export interface GlobalStory extends Story {
  content: {
    _uid: string
    page_title: string // NOT USED
    component: 'global'
    header_menu_items?: ReadonlyArray<MenuItem>
    show_cta: boolean
    cta_label: string
    cta_link: LinkComponent
    footer_menu_items_1?: ReadonlyArray<MenuItem>
    footer_menu_items_2?: ReadonlyArray<MenuItem>
    get_started?: ReadonlyArray<MenuItem>
    company?: ReadonlyArray<MenuItem>
    legal?: ReadonlyArray<MenuItem>
    social?: ReadonlyArray<MenuItem>
    footer_menu_items: ReadonlyArray<MenuItem>
    footer_download_title?: string
    footer_safety_title?: string
    footer_safety_body: MarkdownHtmlComponent
    footer_rating_title?: string
    footer_rating_paragraph: MarkdownHtmlComponent
    footer_market_title?: string
    footer_paragraph: MarkdownHtmlComponent
    peril_modal_info_title?: string
    peril_modal_coverage_title?: string
    peril_modal_exceptions_title?: string
    four_oh_four_title?: string
    cookie_consent_message: MarkdownHtmlComponent
    structured_data_website_description?: string
    structured_data_organization_description?: string
    structured_data_review_value?: string
    structured_data_review_count?: string
  }
}

export interface DatasourceEntry {
  id: string
  name: string
  value: string
  dimension_value: null | string
}

export interface GlobalStoryContainerProps {
  children: (props: { globalStory: GlobalStory }) => React.ReactNode
}

export const GlobalStoryContainer: React.FunctionComponent<GlobalStoryContainerProps> = ({
  children,
}) => (
  <Container<{ story: GlobalStory | undefined }> context="globalStory">
    {({ story }) =>
      story ? (
        children({ globalStory: story })
      ) : (
        <ErrorBlock message="NO GLOBAL POST FOUND - remove block or add a global post" />
      )
    }
  </Container>
)

interface WithUpdateState<TStoryType extends Story> {
  updateState: (newState: { story: WithStory<TStoryType> }) => void
}

export interface StoryContainerProps<TStoryType extends Story> {
  children: (props: WithStory<TStoryType>) => React.ReactNode
}

export class StoryContainer<TStoryType extends Story> extends PureComponent<
  StoryContainerProps<TStoryType>
> {
  private timeout: number | undefined
  public componentDidMount() {
    const update = () => {
      fetch(window.location.pathname + window.location.search, {
        headers: { accept: 'application/json' },
      })
        .then((r) => r.json())
        .then((data) => {
          ;(window as any).updateStoryContainer(data)
        })
        .finally(() => {
          this.timeout = window.setTimeout(update, 5000)
        })
    }

    if (window.location.search.includes('live_reload=true')) {
      this.timeout = window.setTimeout(update, 5000)
    }
  }

  public componentWillUnmount() {
    window.clearTimeout(this.timeout)
  }

  public render() {
    const { children } = this.props
    return (
      <Container<WithStory<TStoryType>, WithUpdateState<TStoryType>>
        context="story"
        actions={{
          updateState: (newState) => () => newState.story,
        }}
      >
        {({ updateState, ...state }) => {
          if (typeof window !== 'undefined') {
            ;(window as any).updateStoryContainer = updateState
          }

          return children(state)
        }}
      </Container>
    )
  }
}
