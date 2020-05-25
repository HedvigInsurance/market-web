import styled from '@emotion/styled'
import { Caption } from 'components/Caption'
import React from 'react'
import { ContentWrapper } from '../../components/blockHelpers'
import { DeferredImage } from '../../components/DeferredImage'
import { getStoryblokImage, Image as ImageType } from '../../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from '../BaseBlockProps'

interface ImageBlockProps extends BaseBlockProps {
  image: ImageType
  caption?: MarkdownHtmlComponent
  full_width?: boolean
}

const ImageWrapper = styled('div')<{ fullWidth: boolean }>(({ fullWidth }) => ({
  position: 'relative',
  maxHeight: fullWidth ? '45rem' : '34rem',
}))

const Image = styled(DeferredImage)({
  display: 'block',
  width: '100%',
  height: 'auto',
})

export const ImageBlockBrandPivot: React.FunctionComponent<ImageBlockProps> = ({
  image,
  caption,
  full_width = false,
  index,
}) => (
  <ContentWrapper brandPivot fullWidth={full_width} index={index}>
    <ImageWrapper fullWidth={full_width}>
      <Image src={getStoryblokImage(image)} />
      {caption && <Caption caption={caption} />}
    </ImageWrapper>
  </ContentWrapper>
)
