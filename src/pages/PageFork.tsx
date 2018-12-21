import * as React from 'react'
import { Story, StoryContainer } from '../storyblok/StoryContainer'
import { BlogPostPage } from './BlogPostPage'
import { FourOhFourPage } from './FourOhFour'
import { StoryPage } from './StoryPage'

export const PageFork: React.FunctionComponent<{ nonce?: string }> = (
  props,
) => (
  <StoryContainer<Story>>
    {({ story }) => {
      switch (story && story.content.component) {
        case 'page':
          return <StoryPage {...props} />
        case 'blog':
          return <BlogPostPage {...props} />
        default:
          return <FourOhFourPage {...props} />
      }
    }}
  </StoryContainer>
)
