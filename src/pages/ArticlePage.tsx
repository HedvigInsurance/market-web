import React from 'react'
import Helmet from 'react-helmet-async'
import { useLocale } from 'context/LocaleContext'
import { Header } from '../blocks/HeaderBlock'
import { ArticleBlock } from '../blocks/ArticleBlock/ArticleBlock'
import { FooterBlock } from '../blocks/FooterBlock/FooterBlock'
import {
  ArticleStory,
  GlobalStoryContainer,
  StoryContainer,
} from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'

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

          {story && <ArticleBlock story={story} />}

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
