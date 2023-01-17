import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import { ArticleStory, Story } from '../../storyblok/StoryContainer'
import { TABLET_BP_UP } from '../../components/blockHelpers'

const ArticleWrapper = styled.article`
  margin-top: 2rem;
`

const ArticleTitle = styled.h1`
  margin-block: 1rem;
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

export const ArticleCategory = styled.span`
  display: inline-block;
  padding: 0.375rem 0.5rem;
  color: ${colorsV3.gray500};
  border: 1px solid ${colorsV3.gray500};
  border-radius: 6px;
`
export interface ArticleBlockProps {
  story: ArticleStory
}

export const ArticleBlock = ({ story }: ArticleBlockProps) => {
  return (
    <ArticleWrapper>
      {story.content.categories.map((category: Story) => (
        <ArticleCategory key={category.id}>{category.name}</ArticleCategory>
      ))}

      <ArticleTitle>{story.content.page_title}</ArticleTitle>
      <ArticleContent>{render(story.content.content)}</ArticleContent>
    </ArticleWrapper>
  )
}
