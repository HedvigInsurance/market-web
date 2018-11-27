import * as React from 'react'
import Helmet from 'react-helmet-async'
import { getBlockComponent } from '../blocks'
import { BodyStory, StoryContainer } from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'

const getBlocksOrDefault = (story: BodyStory) =>
  (story && story.content && story.content.body) || []

export const StoryPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <StoryContainer>
    {({ story }) => (
      <>
        <Helmet>{getMeta({ story, nonce })}</Helmet>

        {getBlocksOrDefault(story).map((block) => {
          const BlockComponent = getBlockComponent(block.component)
          if (!BlockComponent) {
            return null
          }

          return <BlockComponent key={block._uid} {...block} />
        })}
      </>
    )}
  </StoryContainer>
)
