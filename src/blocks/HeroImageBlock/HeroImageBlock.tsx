import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import React from 'react'
import { HedvigSymbol } from '@hedviginsurance/brand'
import { ButtonLink, ButtonStyleType } from 'components/Button/Button'
import {
  BaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import { FontSizes, Heading } from 'components/Heading/Heading'
import { TextPosition } from 'utils/textPosition'
import { GlobalStory, GlobalStoryContainer } from 'storyblok/StoryContainer'
import { getStoryblokImage, getStoryblokLinkUrl, Image } from 'utils/storyblok'
import {
  ContentWrapper,
  getMinimalColorStyles,
  MOBILE_BP_UP,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'

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
    color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
    backgroundImage: backgroundImage ? `url(${backgroundImageMobile})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    [MOBILE_BP_UP]: {
      backgroundImage: backgroundImage ? `url(${backgroundImageMobile})` : '',
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
  animation: animate ? `${fadeSlideIn} 800ms forwards` : 'none',
  opacity: animate ? 0 : 1,
  animationDelay: '400ms',
  marginBottom: '3.5rem',
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
  justifyContent: 'center',
  marginTop: '3rem',

  ['@media (min-width: 1001px)']: {
    display: 'none',
  },
})

export interface HeroImageBlockProps extends BaseBlockProps {
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
  use_display_font?: boolean
  dynamic_height?: boolean
  show_cta_mobile?: boolean
  cta_mobile_color?: MinimalColorComponent
  cta_mobile_style?: ButtonStyleType
}

export const Hero: React.FC<
  {
    story: GlobalStory
  } & HeroImageBlockProps
> = ({
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
  show_cta_mobile,
  story,
  cta_mobile_color,
  cta_mobile_style,
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
              <HedvigSymbol />
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
        {show_cta_mobile && (
          <ButtonWrapper>
            <ButtonLink
              color={cta_mobile_color?.color}
              styleType={cta_mobile_style}
              href={getStoryblokLinkUrl(story.content.cta_link)}
            >
              {story.content.cta_label}
            </ButtonLink>
          </ButtonWrapper>
        )}
      </ContentWrapper>
    </WrapperWithExtraStyling>
  )
}

export const HeroImageBlock: React.FunctionComponent<HeroImageBlockProps> = (
  heroBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Hero story={globalStory} {...heroBlockProps} />}
  </GlobalStoryContainer>
)
