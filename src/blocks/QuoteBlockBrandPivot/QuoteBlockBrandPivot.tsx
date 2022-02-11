import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import React from 'react'
import { BaseBlockProps, MinimalColorComponent } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  getMinimalColorStyles,
  SectionWrapper,
} from 'components/blockHelpers'

export interface QuoteBlockProps extends BaseBlockProps {
  quotes: ReadonlyArray<{
    _uid: string
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
      width: '100%',
      maxWidth: largeQuote ? 'none' : '53rem',
    },
  }),
)

const Quote = styled('blockquote')<{ largeQuote?: boolean }>(
  ({ largeQuote }) => ({
    fontFamily: fonts.EB_GARAMOND,
    lineHeight: 1.16,
    fontKerning: 'none',
    fontSize: largeQuote ? '3rem' : '2rem',
    margin: '0 0 2.5rem 0',

    '&:before, &:after': {
      position: 'relative',
      display: 'block',
      content: '"“"',
    },

    '&:before': {
      content: '"“"',
      lineHeight: 0.4,
    },

    '&:after': {
      content: '"”"',
      marginTop: '0.35em',
    },

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
  extra_styling = '',
}) => (
  <SectionWrapper
    brandPivot
    colorComponent={color}
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot index={index}>
      {quotes.map((quote) => (
        <QuoteWrapper largeQuote={quote.large_quote} key={quote._uid}>
          <Quote largeQuote={quote.large_quote}>{quote.quote}</Quote>
          <Cite colorComponent={color}>{quote.author}</Cite>
        </QuoteWrapper>
      ))}
    </ContentWrapper>
  </SectionWrapper>
)
