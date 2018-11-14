import * as React from 'react'
import Helmet from 'react-helmet-async'
import { getBlockComponent } from '../blocks'
import { StoryContainer } from '../storyblok/StoryContainer'

export const StoryPage: React.SFC = () => (
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

        {story.content.body.map((block) => {
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
