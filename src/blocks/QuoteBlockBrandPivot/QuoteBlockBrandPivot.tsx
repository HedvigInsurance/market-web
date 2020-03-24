import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import {
  BrandPivotBaseBlockProps,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  getMinimalColorStyles,
  SectionWrapper,
} from 'components/blockHelpers'
import React from 'react'

export interface QuoteBlockProps extends BrandPivotBaseBlockProps {
  quotes: ReadonlyArray<{
    quote: string
    author: string
    large_quote?: boolean
  }>
}

const TABLET_BP_UP = '@media (min-width: 850px)'

const QuoteWrapper = styled('div')<{ largeQuote?: boolean }>(
  ({ largeQuote }) => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',

    [TABLET_BP_UP]: {
      width: largeQuote ? '100%' : '80%',
    },
  }),
)

const Quote = styled('blockquote')<{ largeQuote?: boolean }>(
  ({ largeQuote }) => ({
    fontFamily: fonts.EB_GARAMOND,
    lineHeight: 1.16,
    fontKerning: 'none',
    fontSize: largeQuote ? '4rem' : '2rem',
    margin: '0 0 2.5rem 0',

    [TABLET_BP_UP]: {
      marginBottom: '4rem',
      fontSize: largeQuote ? '6rem' : '3rem',
    },
  }),
)

const Cite = styled('cite')<{
  colorComponent?: MinimalColorComponent
}>(({ colorComponent }) => ({
  fontStyle: 'normal',
  color: getMinimalColorStyles(colorComponent?.color ?? 'standard')
    .secondaryColor,
}))

export const QuoteBlockBrandPivot: React.FunctionComponent<QuoteBlockProps> = ({
  color,
  quotes,
  index,
}) => (
  <SectionWrapper brandPivot colorComponent={color}>
    <ContentWrapper brandPivot index={index}>
      {quotes.map((quote) => (
        <QuoteWrapper largeQuote={quote.large_quote}>
          <Quote largeQuote={quote.large_quote}>{quote.quote}</Quote>
          <Cite colorComponent={color}>{quote.author}</Cite>
        </QuoteWrapper>
      ))}
    </ContentWrapper>
  </SectionWrapper>
)
