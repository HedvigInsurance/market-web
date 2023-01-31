import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import { render } from 'storyblok-rich-text-react-renderer'
import { ArticleStory, Story } from '../../storyblok/StoryContainer'
import { TABLET_BP_UP } from '../../components/blockHelpers'

const ArticleWrapper = styled.article`
  margin-top: 4rem;
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

export const ArticleCategory = styled.a<{ as?: 'span' | 'a' }>`
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${colorsV3.gray600};
  border-radius: 6px;
  color: ${colorsV3.gray600};
  text-decoration: none;
`

export const ArticleDate = styled.div`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  line-height: 1.2;
  color: ${colorsV3.gray600};
  text-transform: uppercase;
`

export interface ArticleBlockProps {
  story: ArticleStory
}

export const ArticleBlock = ({ story }: ArticleBlockProps) => {
  return (
    <ArticleWrapper>
      {story.content.categories.map((category: Story) => (
        <ArticleCategory key={category.id} href={`/${category.full_slug}`}>
          {category.name}
        </ArticleCategory>
      ))}

      <ArticleTitle>{story.content.page_title}</ArticleTitle>
      {story.content.date && <ArticleDate>{story.content.date}</ArticleDate>}
      <ArticleContent>{render(story.content.content)}</ArticleContent>
    </ArticleWrapper>
  )
}
