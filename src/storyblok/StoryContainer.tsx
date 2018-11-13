import { Container } from 'constate'
import * as React from 'react'

export interface BodyStory {
  name: string
  created_at: string
  published_at: string
  id: string
  uuid: string
  slug: string
  full_slug: string
  content: {
    _uid: string
    component: 'page'
    body: ReadonlyArray<{
      _uid: string
      component: string
    }>
  }
}

export interface WithStory {
  story: BodyStory
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
