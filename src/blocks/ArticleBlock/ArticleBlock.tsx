import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import { ArticleStory } from '../../storyblok/StoryContainer'
import { TABLET_BP_UP } from '../../components/blockHelpers'

const ArticleWrapper = styled.div`
  max-width: 41rem;
  margin: 1rem auto 8rem;
  padding-inline: 1rem;
`

const ArticleTitle = styled.h1`
  margin-bottom: 1rem;
  font-size: 2rem;
  font-family: ${fonts.HEDVIG_LETTERS_BIG}, sans-serif;
  line-height: 1.2;
  ${TABLET_BP_UP} {
    font-size: 3rem;
  }
`

const ArticleContent = styled.div`
  img {
    display: block;
  }

  ${TABLET_BP_UP} {
    p {
      margin-block: 1.5rem;
    }
  }

  .preamble {
    font-size: 1.125rem;
    line-height: 1.2;
    ${TABLET_BP_UP} {
      font-size: 1.5rem;
    }
  }
`

export interface ArticleBlockProps {
  story: ArticleStory
}

export const ArticleBlock = ({ story }: ArticleBlockProps) => {
  return (
    <ArticleWrapper>
      <ArticleTitle>{story.content.page_title}</ArticleTitle>
      <ArticleContent>{render(story.content.content)}</ArticleContent>
    </ArticleWrapper>
  )
}
