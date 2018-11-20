import { Container } from 'constate'
import * as React from 'react'
import { BaseBlockProps } from '../blocks/BaseBlockProps'

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

export interface GlobalStory extends Story {
  content: {
    header_menu_items?: ReadonlyArray<{
      _uid: string
      label: string
      link: LinkComponent
      component: 'menu_item'
    }>
    show_cta: boolean
    cta_label: string
    cta_link: LinkComponent
  }
}

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
