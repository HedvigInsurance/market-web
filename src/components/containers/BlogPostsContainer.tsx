import { Container } from 'constate'
import * as React from 'react'
import { BlogStory } from '../../storyblok/StoryContainer'

interface State {
  blogPosts: ReadonlyArray<BlogStory>
}

interface BlogPostsContainerProps {
  children: (props: State) => React.ReactNode
}

export const BlogPostsContainer: React.FunctionComponent<
  BlogPostsContainerProps
> = ({ children }) => (
  <Container<State> context="blogPosts">{children}</Container>
)
