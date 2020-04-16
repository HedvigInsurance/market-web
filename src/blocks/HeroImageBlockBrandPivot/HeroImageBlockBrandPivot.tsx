import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import { FontSizes, Heading } from 'components/Heading/Heading'
import { HedvigH } from 'components/icons/HedvigH'
import React from 'react'
import { TextPosition } from 'src/utils/textPosition'
import { getStoryblokImage, Image } from 'utils/storyblok'
import {
  ContentWrapper,
  getMinimalColorStyles,
  MOBILE_BP_UP,
  SectionWrapper,
  TABLET_BP_UP,
} from '../../components/blockHelpers'

interface Animatable {
  animate?: boolean
}

type TextProps = {
  colorComponent?: MinimalColorComponent
  textPosition?: TextPosition
} & Animatable

interface WrapperProps {
  colorComponent?: MinimalColorComponent
  backgroundImageMobile?: Image
  backgroundImage?: Image
  dynamicHeight: boolean
}

const Wrapper = styled(SectionWrapper)<WrapperProps>(
  ({
    colorComponent,
    backgroundImageMobile,
    backgroundImage,
    dynamicHeight,
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: dynamicHeight ? '50vh' : '100vh',
    fontFamily: `${fonts.FAVORIT}, sans-serif`,
    color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
    backgroundImage: `url(${backgroundImageMobile})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

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

const HeroHeadline = styled(Heading)<Animatable>(({ animate }) => ({
  position: 'relative',
  animation: animate ? `${fadeSlideIn} 1000ms forwards` : 'none',
  opacity: animate ? 0 : 1,
  animationDelay: '400ms',
  marginBottom: '3.5rem',
  fontFamily: fonts.FAVORIT,
}))

const Text = styled('div')<TextProps>(
  ({ animate, colorComponent, textPosition }) => ({
    animation: animate ? `${fadeSlideIn} 1000ms forwards` : 'none',
    opacity: animate ? 0 : 1,
    animationDelay: '700ms',
    maxWidth: '40rem',
    marginLeft: textPosition === 'left' ? '0' : 'auto',
    marginRight: textPosition === 'right' ? '0' : 'auto',
    color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
    fontSize: '1.25rem',
    textAlign: textPosition ?? 'center',

    [TABLET_BP_UP]: {
      fontSize: '1.5rem',
    },
  }),
)

const Wordmark = styled('div')({
  display: 'inline-flex',
  position: 'absolute',
  marginTop: '0.625rem',
  marginLeft: '0.5rem',

  ['svg']: {
    width: '1.25rem',
    height: '1.25rem',
  },

  [TABLET_BP_UP]: {
    marginTop: '1rem',
    ['svg']: {
      width: '2rem',
      height: '2rem',
    },
  },
})

export interface HeroImageBlockBrandPivotProps
  extends BrandPivotBaseBlockProps {
  headline: string
  headline_font_size: FontSizes
  headline_font_size_mobile?: FontSizes
  text: MarkdownHtmlComponent
  text_color?: MinimalColorComponent
  text_position?: TextPosition
  image: Image
  image_mobile: Image
  animate?: boolean
  show_hedvig_wordmark?: boolean
  use_display_font?: boolean
  dynamic_height?: boolean
}

export const HeroImageBlockBrandPivot: React.FC<HeroImageBlockBrandPivotProps> = ({
  color,
  extra_styling,
  animate,
  headline,
  text,
  text_color,
  headline_font_size,
  headline_font_size_mobile,
  image,
  index,
  image_mobile,
  use_display_font = false,
  show_hedvig_wordmark,
  dynamic_height = false,
  text_position = 'center',
  size,
}) => {
  return (
    <WrapperWithExtraStyling
      colorComponent={color}
      extraStyling={extra_styling}
      backgroundImage={getStoryblokImage(image)}
      backgroundImageMobile={getStoryblokImage(image_mobile)}
      size={size}
      dynamicHeight={dynamic_height}
    >
      <ContentWrapper index={index} brandPivot>
        <HeroHeadline
          as="h1"
          animate={animate}
          size={headline_font_size}
          mobileSize={headline_font_size_mobile}
          textPosition={text_position}
          useDisplayFont={use_display_font}
        >
          {headline}
          {show_hedvig_wordmark && (
            <Wordmark>
              <HedvigH />
            </Wordmark>
          )}
        </HeroHeadline>
        <Text
          dangerouslySetInnerHTML={{ __html: text?.html }}
          animate={animate}
          colorComponent={text_color}
          textPosition={text_position}
        />
      </ContentWrapper>
    </WrapperWithExtraStyling>
  )
}
