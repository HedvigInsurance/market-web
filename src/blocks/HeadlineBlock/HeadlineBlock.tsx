import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { HedvigH } from 'components/icons/HedvigH'
import React from 'react'
import { TextPosition } from 'utils/textPosition'

interface HeadlineBlockProps extends BrandPivotBaseBlockProps {
  text: string
  text_position: TextPosition
  use_display_font: boolean
  show_hedvig_wordmark?: boolean
  font_size: 'xs' | 'sm' | 'md' | 'lg'
  element: 'h1' | 'h2' | 'h3' | 'h4'
}

const sizeMap = {
  xs: '1rem',
  sm: '2rem',
  md: '3rem',
  lg: '6rem',
}

const createHeadline = (element: 'h1' | 'h2' | 'h3' | 'h4') =>
  styled(element)<{
    textPosition: TextPosition
    size: 'xs' | 'sm' | 'md' | 'lg'
    useDisplayFont: boolean
  }>(({ textPosition, size, useDisplayFont }) => ({
    position: 'relative',
    textAlign: textPosition,
    fontSize: sizeMap[size],
    margin: 0,
    fontFamily: useDisplayFont ? `${fonts.EB_GARAMOND}, serif` : undefined,
    lineHeight: 1.5,
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

export const HeadlineBlock: React.FC<HeadlineBlockProps> = ({
  color,
  index,
  text,
  text_position,
  use_display_font,
  show_hedvig_wordmark,
  extra_styling,
  element,
  font_size,
}) => {
  const Headline = createHeadline(element)

  return (
    <SectionWrapper
      colorComponent={color}
      extraStyling={extra_styling}
      size="none"
      brandPivot
    >
      <ContentWrapper brandPivot index={index}>
        <Headline
          textPosition={text_position}
          size={font_size}
          useDisplayFont={use_display_font}
        >
          {text}
          {show_hedvig_wordmark && (
            <Wordmark>
              <HedvigH />
            </Wordmark>
          )}
        </Headline>
      </ContentWrapper>
    </SectionWrapper>
  )
}
