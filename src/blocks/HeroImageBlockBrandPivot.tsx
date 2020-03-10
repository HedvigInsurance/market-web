import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  getMinimalColorStyles,
  getSectionSizeStyle,
  MOBILE_BP_UP,
} from 'components/blockHelpers'
import * as React from 'react'
import { SectionSize } from 'utils/SectionSize'
import { getStoryblokImage, Image } from 'utils/storyblok'
import { keyframes } from '@emotion/core'

interface Animatable {
  animate?: boolean
}

interface WrapperProps {
  colorComponent?: MinimalColorComponent
  backgroundImageMobile?: Image
  backgroundImage?: Image
  size?: SectionSize
}

const Wrapper = styled('div')<WrapperProps>(
  ({
    colorComponent,
    backgroundImageMobile,
    backgroundImage,
    size = 'none',
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    minHeight: '100vh',
    fontFamily: `${fonts.FAVORIT}, sans-serif`,
    color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
    backgroundColor: getMinimalColorStyles(colorComponent?.color ?? 'standard')
      .background,
    backgroundImage: `url(${backgroundImageMobile})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    ...getSectionSizeStyle(size),

    [MOBILE_BP_UP]: {
      backgroundImage: `url(${backgroundImage})`,
    },
  }),
)

const WrapperWithExtraStyling = styled(Wrapper)<{ extraStyling?: string }>`
  ${({ extraStyling }) => extraStyling};
`

const fadeSlideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(10%)' },
  to: { opacity: 1, transform: 'translateY(0%)' },
})

const HeroHeadline = styled('h1')<Animatable>(({ animate }) => ({
  animation: animate ? `${fadeSlideIn} 1000ms forwards` : 'none',
  opacity: animate ? 0 : 1,
  animationDelay: '400ms',

  fontSize: '4rem',

  [MOBILE_BP_UP]: {
    fontSize: '7.5rem',
  },

  '&&': {
    fontFamily: `${fonts.EB_GARAMOND}, serif`,
  },
}))

const IndentedText = styled('div')<Animatable>(({ animate }) => ({
  animation: animate ? `${fadeSlideIn} 1000ms forwards` : 'none',
  opacity: animate ? 0 : 1,
  animationDelay: '700ms',

  [MOBILE_BP_UP]: {
    paddingLeft: '7rem',
  },
}))

interface HeroImageBlockBrandPivotProps extends BrandPivotBaseBlockProps {
  headline: string
  indented_text: MarkdownHtmlComponent
  image: Image
  image_mobile: Image
  animate?: boolean
}

export const HeroImageBlockBrandPivot: React.FC<HeroImageBlockBrandPivotProps> = ({
  color,
  size,
  extra_styling,
  animate,
  headline,
  indented_text,
  image,
  index,
  image_mobile,
}) => {
  return (
    <WrapperWithExtraStyling
      colorComponent={color}
      extraStyling={extra_styling}
      backgroundImage={getStoryblokImage(image)}
      backgroundImageMobile={getStoryblokImage(image_mobile)}
      size={size}
    >
      <ContentWrapper index={index}>
        <HeroHeadline animate={animate}>{headline}</HeroHeadline>
        <IndentedText
          dangerouslySetInnerHTML={{ __html: indented_text?.html }}
          animate={animate}
        />
      </ContentWrapper>
    </WrapperWithExtraStyling>
  )
}
