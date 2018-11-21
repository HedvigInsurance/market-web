import { fonts } from '@hedviginsurance/brand/dist'
import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 850px)'

type TextPosition = 'left' | 'right' | 'center'

const textFlexPositionMap = {
  left: 'flex-start',
  center: 'space-around',
  right: 'flex-end',
}

const Wrapper = styled('div')(
  ({ textPosition }: { textPosition: TextPosition }) => ({
    display: 'flex',
    width: '100%',
    justifyContent: textFlexPositionMap[textPosition],
  }),
)

const QuoteWrapper = styled('div')(
  ({ textPosition }: { textPosition: TextPosition }) => ({
    width: textPosition === 'center' ? '66%' : '50%',
    textAlign: textPosition === 'center' ? 'center' : 'left',

    [TABLET_BP_DOWN]: {
      width: '100%',
    },
  }),
)

const Quote = styled('blockquote')({
  fontFamily: fonts.SORAY,
  lineHeight: 1,
  fontKerning: 'none',
  fontSize: '3.5rem',
  margin: 0,
})
const Cite = styled('cite')({})

export interface SingleQuoteBlockProps extends BaseBlockProps {
  quote: string
  author: string
  text_position: TextPosition
}

export const SingleQuoteBlock: React.FunctionComponent<
  SingleQuoteBlockProps
> = ({ color, quote, author, text_position }) => (
  <SectionWrapper color={color && color.color}>
    <ContentWrapper>
      <Wrapper textPosition={text_position}>
        <QuoteWrapper textPosition={text_position}>
          <Quote>{quote}</Quote>
          <Cite>{author}</Cite>
        </QuoteWrapper>
      </Wrapper>
    </ContentWrapper>
  </SectionWrapper>
)
