import { Container } from 'constate'
import * as React from 'react'

export interface WithStory {
  story: any
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
