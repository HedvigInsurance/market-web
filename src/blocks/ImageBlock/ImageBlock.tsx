import styled from '@emotion/styled'
import React from 'react'
import { Caption } from 'components/Caption'
import { ContentWrapper } from '../../components/blockHelpers'
import { DeferredImage } from '../../components/DeferredImage'
import {
  getStoryblokImage,
  ImageLegacy as ImageType,
} from '../../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from '../BaseBlockProps'

interface ImageBlockProps extends BaseBlockProps {
  image: ImageType
  caption?: MarkdownHtmlComponent
  full_width?: boolean
}

const StyledContentWrapper = styled(ContentWrapper)<{ extraStyling?: string }>`
  ${({ extraStyling }) => String(extraStyling)}
`

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled(DeferredImage)({
  display: 'block',
  width: '100%',
})

export const ImageBlock: React.FunctionComponent<ImageBlockProps> = ({
  image,
  caption,
  full_width = false,
  index,
  extra_styling,
}) => (
  <StyledContentWrapper
    brandPivot
    fullWidth={full_width}
    index={index}
    extraStyling={extra_styling}
  >
    <ImageWrapper>
      <Image src={getStoryblokImage(image)} />
      {caption && <Caption caption={caption} />}
    </ImageWrapper>
  </StyledContentWrapper>
)
