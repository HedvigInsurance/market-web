import React from 'react'
import Helmet from 'react-helmet-async'
import SbEditable from 'patched/storyblok-react'
import { getBlockComponent } from '../blocks'
import { BaseBlockProps } from '../blocks/BaseBlockProps'
import { FooterBlock } from '../blocks/FooterBlock/FooterBlock'
import {
  BodyStory,
  GlobalStoryContainer,
  StoryContainer,
} from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'
import { ContextContainer } from '../components/containers/ContextContainer'

const getBlocksOrDefault = (story: BodyStory) =>
  (story && story.content && story.content.body) ?? []

export const StoryPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <StoryContainer<BodyStory>>
    {({ story }) => (
      <>
        <GlobalStoryContainer>
          {({ globalStory }) => (
            <ContextContainer>
              {({ currentLocale }) => (
                <Helmet>
                  {getMeta({ story, nonce, currentLocale, globalStory })}
                </Helmet>
              )}
            </ContextContainer>
          )}
        </GlobalStoryContainer>
        {getBlocksOrDefault(story!).map((block, index) => {
          const BlockComponent:
            | React.ComponentType<BaseBlockProps & any>
            | undefined = getBlockComponent(block.component)
          if (!BlockComponent) {
            return null
          }

          if (block._editable) {
            return (
              <SbEditable content={block} key={block._uid}>
                <BlockComponent index={index} {...block} />
              </SbEditable>
            )
          }

          return <BlockComponent key={block._uid} index={index} {...block} />
        })}
        {!story?.content.hide_footer && (
          <FooterBlock
            component="footer_block"
            _uid="a6f692fc-2dcc-42b9-a031-c47f8e829c1b"
            color={{
              _uid: '4a200d8c-9ebc-4648-b41d-3b1b0de8fbc5',
              color: 'standard-inverse',
              plugin: 'hedvig_minimal_color_picker',
            }}
          />
        )}
      </>
    )}
  </StoryContainer>
)
