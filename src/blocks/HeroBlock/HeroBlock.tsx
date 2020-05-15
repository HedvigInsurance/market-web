import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import {
  ButtonLinkBrandPivot,
  ButtonStyleType,
} from 'components/ButtonBrandPivot/Button'
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
    justifyContent: 'flex-end',
    minHeight: dynamicHeight ? '50vh' : '100vh',
    paddingTop: '2.5rem',
    paddingBottom: '2.5rem',
    color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
    backgroundImage: backgroundImage
      ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backgroundImageMobile})`
      : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    [MOBILE_BP_UP]: {
      backgroundImage: backgroundImage
        ? `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backgroundImageMobile})`
        : '',
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

const HeroContent = styled(ContentWrapper)`
  z-index: 2;
`

const HeroHeadline = styled(Heading)<Animatable>(({ animate }) => ({
  position: 'relative',
  animation: animate ? `${fadeSlideIn} 800ms forwards` : 'none',
  opacity: animate ? 0 : 1,
  animationDelay: '400ms',
  marginBottom: '1rem',

  br: {
    display: 'none',
    [MOBILE_BP_UP]: {
      display: 'block',
    },
  },
}))

const Text = styled('div')<TextProps>(
  ({ animate, colorComponent, textPosition }) => ({
    animation: animate ? `${fadeSlideIn} 800ms forwards` : 'none',
    opacity: animate ? 0 : 1,
    animationDelay: '600ms',
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

const ButtonWrapper = styled('div')({
  display: 'flex',
  paddingTop: '0.5rem',

  [TABLET_BP_UP]: {
    paddingTop: '1rem',
  },
})

export interface HeroBlockProps extends BrandPivotBaseBlockProps {
  headline: string
  headline_font_size: FontSizes
  headline_font_size_mobile?: FontSizes
  text?: MarkdownHtmlComponent
  text_color?: MinimalColorComponent
  text_position?: TextPosition
  image: Image
  image_mobile: Image
  animate?: boolean
  show_hedvig_wordmark?: boolean
  dynamic_height?: boolean
  show_cta?: boolean
  cta_label?: string
  cta_color?: MinimalColorComponent
  cta_style?: ButtonStyleType
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  color,
  extra_styling,
  animate,
  headline,
  text,
  text_color,
  headline_font_size,
  headline_font_size_mobile,
  image,
  image_mobile,
  index,
  show_hedvig_wordmark,
  dynamic_height = false,
  text_position = 'left',
  show_cta,
  cta_label,
  cta_color,
  cta_style,
}) => {
  return (
    <WrapperWithExtraStyling
      colorComponent={color}
      extraStyling={extra_styling}
      backgroundImage={getStoryblokImage(image)}
      backgroundImageMobile={getStoryblokImage(image_mobile)}
      dynamicHeight={dynamic_height}
    >
      <HeroContent index={index} brandPivot fullWidth>
        <HeroHeadline
          as="h1"
          animate={animate}
          size={headline_font_size}
          mobileSize={headline_font_size_mobile}
          textPosition={text_position}
        >
          <span dangerouslySetInnerHTML={{ __html: headline }} />
          {show_hedvig_wordmark && (
            <Wordmark>
              <HedvigH />
            </Wordmark>
          )}
        </HeroHeadline>
        {text && (
          <Text
            dangerouslySetInnerHTML={{ __html: text?.html }}
            animate={animate}
            colorComponent={text_color}
            textPosition={text_position}
          />
        )}
        {show_cta && cta_label && (
          <ButtonWrapper>
            <ButtonLinkBrandPivot
              color={cta_color?.color}
              styleType={cta_style}
            >
              {cta_label}
            </ButtonLinkBrandPivot>
          </ButtonWrapper>
        )}
      </HeroContent>
    </WrapperWithExtraStyling>
  )
}
