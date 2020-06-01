import { css, keyframes } from '@emotion/core'
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
import { LinkComponent } from 'storyblok/StoryContainer'
import { getStoryblokImage, getStoryblokLinkUrl, Image } from 'utils/storyblok'
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
  height?: '80vh' | '90vh' | '100vh'
}

const Wrapper = styled(SectionWrapper)<WrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: ${(props) => props.height ?? '100vh'};
  padding-top: 2.5rem;
  padding-bottom: 2.5rem;

  ${TABLET_BP_UP} {
    padding-bottom: 3.75rem;
  }
`

const WrapperWithExtraStyling = styled(Wrapper)<{ extraStyling?: string }>`
  ${({ extraStyling }) => extraStyling};
`

const fadeSlideIn = keyframes`
  from {
    opacity: 0; 
    transform: translateY(10%); 
  }
  to {
    opacity: 1; 
    transform: translateY(0%);
  }
`

const HeroContent = styled(ContentWrapper)`
  z-index: 2;
`

const HeroHeadline = styled(Heading)<Animatable>`
  position: relative;
  animation: ${(props) =>
    props.animate
      ? css`
          ${fadeSlideIn} 800ms forwards
        `
      : 'none'};
  opacity: ${(props) => (props.animate ? 0 : 1)};
  animation-delay: 1000ms;
  margin-bottom: 1rem;

  ${TABLET_BP_UP} {
    margin-bottom: 1.25rem;
  }

  br {
    display: none;
    ${MOBILE_BP_UP} {
      display: block;
    }
  }
`

const Text = styled.div<TextProps>`
  animation: ${(props) =>
    props.animate
      ? css`
          ${fadeSlideIn} 800ms forwards
        `
      : 'none'};
  opacity: ${(props) => (props.animate ? 0 : 1)};
  animation-delay: 1200ms;
  max-width: 40rem;
  margin-left: ${(props) => (props.textPosition === 'left' ? '0' : 'auto')};
  margin-right: ${(props) => (props.textPosition === 'right' ? '0' : 'auto')};
  color: ${(props) =>
    getMinimalColorStyles(props.colorComponent?.color ?? 'standard').color};
  font-size: 1rem;
  line-height: 1.5;
  text-align: ${(props) => props.textPosition ?? 'center'};

  br {
    display: none;
    ${MOBILE_BP_UP} {
      display: block;
    }
  }
`

const Wordmark = styled.div`
  display: inline-flex;
  position: absolute;
  margin-top: 0.375rem;
  margin-left: 0.25rem;

  svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  ${TABLET_BP_UP} {
    margin-top: 0.5rem;
    margin-left: 0.375rem;
    svg {
      width: 1rem;
      height: 1rem;
    }
  }
`

const ButtonWrapper = styled.div<Animatable>`
  display: flex;
  padding-top: 0.5rem;
  animation: ${(props) =>
    props.animate
      ? css`
          ${fadeSlideIn} 800ms forwards
        `
      : 'none'};
  opacity: ${(props) => (props.animate ? 0 : 1)};
  animation-delay: 1200ms;

  ${TABLET_BP_UP} {
    padding-top: 1rem;
  }
`

export interface HeroBlockProps extends BrandPivotBaseBlockProps {
  headline: string
  headline_font_size: FontSizes
  headline_font_size_mobile?: FontSizes
  text?: MarkdownHtmlComponent
  text_color?: MinimalColorComponent
  text_position?: TextPosition
  image: Image
  image_mobile: Image
  hide_bg_tint: boolean
  animate?: boolean
  show_hedvig_wordmark?: boolean
  height?: '80vh' | '90vh' | '100vh'
  show_cta?: boolean
  cta_label?: string
  cta_link?: LinkComponent
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
  hide_bg_tint,
  index,
  show_hedvig_wordmark,
  height,
  text_position = 'left',
  show_cta,
  cta_label,
  cta_link,
  cta_color,
  cta_style,
}) => {
  return (
    <WrapperWithExtraStyling
      colorComponent={color}
      extraStyling={extra_styling}
      backgroundImage={getStoryblokImage(image)}
      backgroundTint={!hide_bg_tint}
      backgroundImageMobile={getStoryblokImage(image_mobile)}
      height={height}
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
        {show_cta && cta_link && (
          <ButtonWrapper animate={animate}>
            <ButtonLinkBrandPivot
              color={cta_color?.color}
              styleType={cta_style}
              href={getStoryblokLinkUrl(cta_link)}
            >
              {cta_label}
            </ButtonLinkBrandPivot>
          </ButtonWrapper>
        )}
      </HeroContent>
    </WrapperWithExtraStyling>
  )
}
