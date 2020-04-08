import styled from '@emotion/styled'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { Heading } from 'components/Heading/Heading'
import { HedvigH } from 'components/icons/HedvigH'
import React from 'react'
import { TextPosition } from 'utils/textPosition'

interface HeadlineBlockProps extends BrandPivotBaseBlockProps {
  text: string
  text_position: TextPosition
  capitalize?: boolean
  use_display_font: boolean
  show_hedvig_wordmark?: boolean
  font_size: 'xs' | 'sm' | 'md' | 'lg'
  element: 'h1' | 'h2' | 'h3' | 'h4'
}

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
  capitalize = false,
  text_position,
  use_display_font,
  show_hedvig_wordmark,
  extra_styling,
  element,
  font_size,
}) => {
  return (
    <SectionWrapper
      colorComponent={color}
      extraStyling={extra_styling}
      size="none"
      brandPivot
    >
      <ContentWrapper brandPivot index={index}>
        <Heading
          as={element}
          textPosition={text_position}
          size={font_size}
          useDisplayFont={use_display_font}
          capitalize={capitalize}
        >
          {text}
          {show_hedvig_wordmark && (
            <Wordmark>
              <HedvigH />
            </Wordmark>
          )}
        </Heading>
      </ContentWrapper>
    </SectionWrapper>
  )
}
