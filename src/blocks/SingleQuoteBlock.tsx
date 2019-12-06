import { fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { textFlexPositionMap, TextPosition } from '../utils/textPosition'
import { BaseBlockProps } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 850px)'

const Wrapper = styled('div')(
  ({ textPosition }: { textPosition: TextPosition }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: textFlexPositionMap[textPosition],
  }),
)

interface QuoteWrapperProps {
  textPosition: TextPosition
  wide: boolean
}

const getQuoteWrapperWidth = ({ textPosition, wide }: QuoteWrapperProps) => {
  if (textPosition === 'center') {
    return wide ? '90%' : '66%'
  }

  return wide ? '80%' : '50%'
}

const QuoteWrapper = styled('div')(
  ({ textPosition, wide }: QuoteWrapperProps) => ({
    width: getQuoteWrapperWidth({ textPosition, wide }),
    textAlign: textPosition === 'center' ? 'center' : 'left',

    [TABLET_BP_DOWN]: {
      width: '100%',
    },
  }),
)

const Quote = styled('blockquote')(({ shrink }: { shrink: boolean }) => ({
  fontFamily: fonts.GEOMANIST,
  lineHeight: 1,
  fontKerning: 'none',
  fontSize: shrink ? '2.5rem' : '3.5rem',
  margin: 0,

  [TABLET_BP_DOWN]: {
    fontSize: shrink ? '2rem' : '2.5rem',
  },
}))
const Cite = styled('cite')({
  fontStyle: 'normal',
})

export interface SingleQuoteBlockProps extends BaseBlockProps {
  quote: string
  author: string
  is_long_quote: boolean
  text_position: TextPosition
}

export const SingleQuoteBlock: React.FunctionComponent<SingleQuoteBlockProps> = ({
  color,
  quote,
  author,
  is_long_quote,
  text_position,
}) => (
  <SectionWrapper color={color && color.color}>
    <ContentWrapper>
      <Wrapper textPosition={text_position}>
        <QuoteWrapper textPosition={text_position} wide={is_long_quote}>
          <Quote shrink={is_long_quote}>{quote}</Quote>
          <Cite>{author}</Cite>
        </QuoteWrapper>
      </Wrapper>
    </ContentWrapper>
  </SectionWrapper>
)
