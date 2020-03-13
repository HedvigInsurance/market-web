import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import {
  CONTENT_GUTTER,
  CONTENT_GUTTER_MOBILE,
  CONTENT_MAX_WIDTH_DEPRECATED,
  GIANT_BP_UP,
  MOBILE_BP_DOWN,
} from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image as ImageType } from '../utils/storyblok'
import { BaseBlockProps } from './BaseBlockProps'

interface ImageBlockProps extends BaseBlockProps {
  image: ImageType
  caption?: string
  caption_shadow: boolean
}

const Wrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxHeight: '30rem',
  overflow: 'hidden',
})

const Image = styled(DeferredImage)({
  maxWidth: `calc(${CONTENT_MAX_WIDTH_DEPRECATED.maxWidth}px - ${CONTENT_GUTTER}*2)`,
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  [GIANT_BP_UP]: {
    maxWidth: `calc(${CONTENT_MAX_WIDTH_DEPRECATED[GIANT_BP_UP].maxWidth}px - ${CONTENT_GUTTER}*2)`,
  },
})

const Caption = styled('div')({
  position: 'absolute',
  bottom: 0,
  padding: `0 ${CONTENT_GUTTER} ${CONTENT_GUTTER} ${CONTENT_GUTTER}`,
  color: colors.WHITE,
  textAlign: 'center',
  ...CONTENT_MAX_WIDTH_DEPRECATED,

  [MOBILE_BP_DOWN]: {
    padding: `0 ${CONTENT_GUTTER_MOBILE} ${CONTENT_GUTTER_MOBILE} ${CONTENT_GUTTER_MOBILE}`,
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
  maxWidth: `calc(${CONTENT_MAX_WIDTH_DEPRECATED.maxWidth}px - ${CONTENT_GUTTER}*2)`,
  transform: 'translateX(-50%)',
  backgroundImage:
    'linear-gradient(transparent, transparent 20%, rgba(0,0,0,0.85))',
  color: 'white',
  paddingBottom: 20,
  '@media(min-width: 900px)': {
    backgroundImage:
      'linear-gradient(transparent, transparent 60%, rgba(0,0,0,0.85))',
  },
  [GIANT_BP_UP]: {
    maxWidth: `calc(${CONTENT_MAX_WIDTH_DEPRECATED[GIANT_BP_UP].maxWidth}px - ${CONTENT_GUTTER}*2)`,
  },
})

export const ImageBlock: React.FunctionComponent<ImageBlockProps> = ({
  image,
  caption,
  caption_shadow,
}) => (
  <Wrapper>
    <Image src={getStoryblokImage(image)} />
    {caption_shadow && <Shadow />}
    {caption && <Caption>{caption}</Caption>}
  </Wrapper>
)
