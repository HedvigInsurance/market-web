import React from 'react'
import Helmet from 'react-helmet-async'
import styled from '@emotion/styled'
import { useLocale } from 'context/LocaleContext'
import { BaseBlockProps } from 'blocks/BaseBlockProps'
import { getBlockComponent } from 'blocks'
import SbEditable from 'patched/storyblok-react'
import { ContentWrapperStyled } from 'components/blockHelpers'
import { Header } from '../blocks/HeaderBlock'
import { ArticleBlock } from '../blocks/ArticleBlock/ArticleBlock'
import { FooterBlock } from '../blocks/FooterBlock/FooterBlock'
import {
  ArticleStory,
  GlobalStoryContainer,
  StoryContainer,
} from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'

const Wrapper = styled.div`
  max-width: 41rem;
  margin: 1rem auto 8rem;
  padding-inline: 1rem;
`
const ArticleFooter = styled.div`
  ${ContentWrapperStyled} {
    padding-inline: 0;
  }
`

export const ArticlePage = ({ nonce }: { nonce?: string }) => {
  const { currentLocale } = useLocale()
  return (
    <StoryContainer<ArticleStory>>
      {({ story }) => (
        <>
          <GlobalStoryContainer>
            {({ globalStory }) => (
              <>
                <Helmet>
                  {getMeta({ story, nonce, currentLocale, globalStory })}
                </Helmet>

                <Header
                  component="header_block"
                  _uid="a6f692fc-2dcc-42b9-a031-c47f8e829c1b"
                  color={{
                    _uid: '4a200d8c-9ebc-4648-b41d-3b1b0de8fbc5',
                    color: 'standard-inverse',
                    plugin: 'hedvig_minimal_color_picker',
                  }}
                  cta_style="outlined"
                  is_transparent={false}
                  inverse_colors={false}
                  story={globalStory}
                />
              </>
            )}
          </GlobalStoryContainer>
          <Wrapper>
            {story && <ArticleBlock story={story} />}

            <ArticleFooter>
              {story?.content.article_footer.map((block, index) => {
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

                return (
                  <BlockComponent key={block._uid} index={index} {...block} />
                )
              })}
            </ArticleFooter>
          </Wrapper>
          <FooterBlock
            component="footer_block"
            _uid="a6f692fc-2dcc-42b9-a031-c47f8e829c1b"
            color={{
              _uid: '4a200d8c-9ebc-4648-b41d-3b1b0de8fbc5',
              color: 'standard-inverse',
              plugin: 'hedvig_minimal_color_picker',
            }}
          />
        </>
      )}
    </StoryContainer>
  )
}
