import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import React from 'react'
import { ArticleStory } from 'src/storyblok/StoryContainer'
import { getStoryblokImage } from '../../utils/storyblok'

const ImageWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;

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
  font-size: 1.5rem;
  line-height: 1.2;

  && {
    font-family: ${fonts.HEDVIG_LETTERS_SMALL}, serif;
  }
`

const Subtitle = styled.p`
  margin-top: 0.75rem;
`

export const ArticleTeaser = ({
  page_title,
  teaser,
  teaser_image,
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
      <div>
        <Title>{page_title}</Title>
        <Subtitle>{teaser}</Subtitle>
      </div>
    </>
  )
}
