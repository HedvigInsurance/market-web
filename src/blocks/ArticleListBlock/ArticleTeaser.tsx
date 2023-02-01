import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import React from 'react'
import { ArticleStory, Story } from 'src/storyblok/StoryContainer'
import { getStoryblokImage } from '../../utils/storyblok'
import { ArticleCategory, ArticleDate } from '../ArticleBlock/ArticleBlock'
import { TABLET_BP_UP } from '../../components/blockHelpers'

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;

  @supports not (aspect-ratio: auto) {
    height: 0;
    padding-top: calc((9 / 16 * 100%));
    overflow: hidden;
  }
`

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;

  @supports not (aspect-ratio: auto) {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Title = styled.h3`
  margin-block: 0.75rem;
  font-size: 1.5rem;
  line-height: 1.2;

  && {
    font-family: ${fonts.HEDVIG_LETTERS_SMALL}, serif;
  }
`

const Subtitle = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 1.5rem;
`

const Content = styled.div`
  ${TABLET_BP_UP} {
    display: grid;
    grid-template-rows: 1.25rem 1fr min-content 2.5rem;
  }
`

export const ArticleTeaser = ({
  page_title,
  date,
  teaser,
  teaser_image,
  categories,
}: ArticleStory['content']) => {
  return (
    <>
      <ImageWrapper>
        {teaser_image && (
          <Image
            alt={teaser_image.alt}
            src={getStoryblokImage(teaser_image.filename)}
          />
        )}
      </ImageWrapper>
      <Content>
        {date && <ArticleDate>{date}</ArticleDate>}
        <Title>{page_title}</Title>
        <Subtitle>{teaser}</Subtitle>
        <div>
          {categories.map((category: Story) => (
            <ArticleCategory key={category.id} as="span">
              {category.name}
            </ArticleCategory>
          ))}
        </div>
      </Content>
    </>
  )
}
