import * as React from 'react'
import Helmet from 'react-helmet-async'
import SbEditable from 'storyblok-react'
import { getBlockComponent } from '../blocks'
import { BaseBlockProps } from '../blocks/BaseBlockProps'
import { BodyStory, StoryContainer } from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'

const getBlocksOrDefault = (story: BodyStory) =>
  (story && story.content && story.content.body) ?? []

export const StoryPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <StoryContainer<BodyStory>>
    {({ story }) => (
      <>
        <Helmet>{getMeta({ story, nonce })}</Helmet>

        {getBlocksOrDefault(story!).map((block, index) => {
          const BlockComponent:
            | React.ComponentType<BaseBlockProps & any>
            | undefined = getBlockComponent(block.component)
          if (!BlockComponent) {
            return null
          }

          if (block._editable) {
            return (
              <SbEditable content={block}  key={block._uid}>
                <BlockComponent index={index} {...block} />
              </SbEditable>
            )
          }

          return <BlockComponent key={block._uid} index={index} {...block} />
        })}
      </>
    )}
  </StoryContainer>
)
