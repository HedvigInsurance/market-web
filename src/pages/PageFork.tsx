import React from 'react'
import { Story, StoryContainer } from '../storyblok/StoryContainer'
import { ArticlePage } from './ArticlePage'
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
        case 'article':
          return <ArticlePage {...props} />
        default:
          return <FourOhFourPage {...props} />
      }
    }}
  </StoryContainer>
)
