import { Container } from 'constate'
import * as React from 'react'
import { BaseBlockProps, MarkdownHtmlComponent } from '../blocks/BaseBlockProps'
import { ErrorBlock } from '../components/blockHelpers'

export interface Story {
  name: string
  created_at: string
  published_at: string
  id: string
  uuid: string
  slug: string
  full_slug: string
}

export interface BodyStory extends Story {
  content: {
    _uid: string
    component: 'page'
    body: ReadonlyArray<BaseBlockProps>
  }
}

export interface WithStory {
  story: BodyStory
}

export interface LinkComponent {
  id: string
  url: string
  linktype: 'story' | 'url'
  cached_url: string // use this
}

interface MenuItem {
  _uid: string
  label: string
  link: LinkComponent
  component: 'menu_item'
}

export interface GlobalStory extends Story {
  content: {
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

export interface StoryContainerProps {
  children: (props: WithStory) => React.ReactNode
}

export const StoryContainer: React.FunctionComponent<StoryContainerProps> = ({
  children,
}) => (
  <Container<WithStory> context="story" pure>
    {(state) => children(state)}
  </Container>
)
