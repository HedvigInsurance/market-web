import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import {
  CONTENT_GUTTER,
  CONTENT_GUTTER_MOBILE,
  CONTENT_MAX_WIDTH,
  ContentWrapper,
  MOBILE_BP_UP,
} from '../../components/blockHelpers'
import { DeferredImage } from '../../components/DeferredImage'
import { getStoryblokImage, Image as ImageType } from '../../utils/storyblok'
import { BaseBlockProps } from '../BaseBlockProps'

interface ImageBlockProps extends BaseBlockProps {
  image: ImageType
  caption?: string
  caption_shadow?: boolean
}

const ImageWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxHeight: '34rem',
  overflow: 'hidden',
  borderRadius: '0.5rem',
})

const Image = styled(DeferredImage)({
  width: '100%',
})

const Caption = styled('div')({
  position: 'absolute',
  bottom: 0,
  padding: `0 ${CONTENT_GUTTER_MOBILE} ${CONTENT_GUTTER_MOBILE} ${CONTENT_GUTTER_MOBILE}`,
  color: colorsV3.white,
  textAlign: 'center',
  ...CONTENT_MAX_WIDTH,

  [MOBILE_BP_UP]: {
    padding: `0 ${CONTENT_GUTTER} ${CONTENT_GUTTER} ${CONTENT_GUTTER}`,
  },
})

const Shadow = styled('div')({
  position: 'absolute',
  display: 'flex',
  alignItems: 'flex-end',
  top: 0,
  left: '50%',
  height: '100%',
  width: '100%',
  maxWidth: `calc(${CONTENT_MAX_WIDTH.maxWidth}px - ${CONTENT_GUTTER}*2)`,
  transform: 'translateX(-50%)',
  backgroundImage:
    'linear-gradient(transparent, transparent 20%, rgba(0,0,0,0.85))',
  color: colorsV3.white,
  paddingBottom: 20,
  '@media(min-width: 900px)': {
    backgroundImage:
      'linear-gradient(transparent, transparent 60%, rgba(0,0,0,0.85))',
  },
})

export const ImageBlockBrandPivot: React.FunctionComponent<ImageBlockProps> = ({
  image,
  caption,
  caption_shadow = false,
}) => (
  <ContentWrapper brandPivot>
    <ImageWrapper>
      <Image src={getStoryblokImage(image)} />
      {caption_shadow && <Shadow />}
      {caption && <Caption>{caption}</Caption>}
    </ImageWrapper>
  </ContentWrapper>
)
