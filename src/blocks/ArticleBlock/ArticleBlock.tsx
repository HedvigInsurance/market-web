import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import { ArticleStory } from '../../storyblok/StoryContainer'
import { TABLET_BP_UP } from '../../components/blockHelpers'

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

  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    margin-block: 2.5rem;
    background-color: ${colorsV3.gray400};
  }
`

export interface ArticleBlockProps {
  story: ArticleStory
}

export const ArticleBlock = ({ story }: ArticleBlockProps) => {
  return (
    <>
      <ArticleTitle>{story.content.page_title}</ArticleTitle>
      <ArticleContent>{render(story.content.content)}</ArticleContent>
    </>
  )
}
