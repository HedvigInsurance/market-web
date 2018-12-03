import * as React from 'react'
import { Story, StoryContainer } from '../storyblok/StoryContainer'
import { BlogPage } from './BlogPage'
import { StoryPage } from './StoryPage'

export const PageFork: React.FunctionComponent<{ nonce?: string }> = (
  props,
) => (
  <StoryContainer<Story>>
    {({ story }) => {
      switch (story.content.component) {
        case 'page':
          return <StoryPage {...props} />
        case 'blog':
          return <BlogPage {...props} />
        default:
          return <StoryPage {...props} />
      }
    }}
  </StoryContainer>
)
