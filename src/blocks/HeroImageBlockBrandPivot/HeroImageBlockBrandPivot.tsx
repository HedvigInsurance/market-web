import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import { HedvigH } from 'components/icons/HedvigH'
import * as React from 'react'
import { SectionSize } from 'utils/SectionSize'
import { getStoryblokImage, Image } from 'utils/storyblok'
import {
  ContentWrapper,
  getMinimalColorStyles,
  getSectionSizeStyle,
  MOBILE_BP_UP,
  TABLET_BP_UP,
} from '../../components/blockHelpers'

interface Animatable {
  animate?: boolean
}

type HeadlineProps = {
  useDisplayFont: boolean
} & Animatable

type TextProps = {
  colorComponent?: MinimalColorComponent
} & Animatable

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
    justifyContent: 'center',
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

const HeroHeadline = styled('h1')<HeadlineProps>(
  ({ animate, useDisplayFont }) => ({
    position: 'relative',
    animation: animate ? `${fadeSlideIn} 1000ms forwards` : 'none',
    opacity: animate ? 0 : 1,
    animationDelay: '400ms',
    marginBottom: '3rem',
    textAlign: 'center',

    fontSize: '3.5rem',

    [TABLET_BP_UP]: {
      fontSize: '6rem',
    },

    '&&': {
      fontFamily: useDisplayFont
        ? `${fonts.EB_GARAMOND}, serif`
        : `${fonts.FAVORIT}, sans-serif`,
    },
  }),
)

const Text = styled('div')<TextProps>(({ animate, colorComponent }) => ({
  animation: animate ? `${fadeSlideIn} 1000ms forwards` : 'none',
  opacity: animate ? 0 : 1,
  animationDelay: '700ms',
  textAlign: 'center',
  maxWidth: '40rem',
  margin: '0 auto',
  color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
  fontSize: '1.25rem',

  [TABLET_BP_UP]: {
    fontSize: '1.5rem',
  },
}))

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
  text: MarkdownHtmlComponent
  text_color?: MinimalColorComponent
  image: Image
  image_mobile: Image
  animate?: boolean
  show_hedvig_wordmark?: boolean
  use_display_font?: boolean
}

export const HeroImageBlockBrandPivot: React.FC<HeroImageBlockBrandPivotProps> = ({
  color,
  size,
  extra_styling,
  animate,
  headline,
  text,
  text_color,
  image,
  index,
  image_mobile,
  use_display_font = false,
  show_hedvig_wordmark,
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
        <HeroHeadline animate={animate} useDisplayFont={use_display_font}>
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
        />
      </ContentWrapper>
    </WrapperWithExtraStyling>
  )
}
