import * as React from 'react'
import Helmet from 'react-helmet-async'
import { getBlockComponent } from '../blocks'
import { BodyStory, StoryContainer } from '../storyblok/StoryContainer'

const getBlocks = (story: BodyStory) =>
  (story && story.content && story.content.body) || []

export const StoryPage: React.FunctionComponent = () => (
  <StoryContainer>
    {({ story }) => (
      <>
        <Helmet>
          <title>{story.name}</title>
          {typeof window === 'undefined' && (
            <link
              rel="canonical"
              href={`${process.env.HOST}/${story.full_slug.replace(
                /\/?home$/,
                '',
              )}`}
            />
          )}
        </Helmet>

        {getBlocks(story).map((block) => {
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
