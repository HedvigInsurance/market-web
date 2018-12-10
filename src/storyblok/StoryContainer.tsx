import { Container } from 'constate'
import * as React from 'react'
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

  content: {
    _uid: string
    page_title: string
    component: 'page' | 'blog' | 'global'
  }
}

export interface BodyStory extends Story {
  content: SeoContent & {
    _uid: string
    page_title: string
    public: boolean
    component: 'page'
    body: ReadonlyArray<BaseBlockProps>
  }
}

export interface WithStory<TStoryType extends Story> {
  story: TStoryType
}

export interface BlogStory extends Story {
  content: SeoContent & {
    _uid: string
    page_title: string
    public: boolean
    component: 'blog'
    top_image: Image
    title: string
    author: string
    excerpt: string
    content: MarkdownHtmlComponent
    show_cta: boolean
    cta_label: string
    cta_branch_link: boolean
    cta_target: string
  }
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
    footer_paragraph: MarkdownHtmlComponent
  }
}

export interface GlobalStoryContainerProps {
  children: (props: { globalStory: GlobalStory }) => React.ReactNode
}

export const GlobalStoryContainer: React.FunctionComponent<
  GlobalStoryContainerProps
> = ({ children }) => (
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

export interface StoryContainerProps<TStoryType extends Story> {
  children: (props: WithStory<TStoryType>) => React.ReactNode
}

export class StoryContainer<
  TStoryType extends Story
> extends React.PureComponent<StoryContainerProps<TStoryType>> {
  public render() {
    const { children } = this.props
    return (
      <Container<WithStory<TStoryType>> context="story" pure>
        {(state) => children(state)}
      </Container>
    )
  }
}
