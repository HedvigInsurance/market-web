import * as React from 'react'
import { BaseBlockProps } from './BaseBlockProps'

export interface SingleQuoteSectionProps extends BaseBlockProps {
  quote: string
  author: string
  textPosition: 'left' | 'right' | 'center'
  backgroundImage?: string
}

export const SingleQuoteSection: React.FunctionComponent<
  SingleQuoteSectionProps
> = (props) => (
  <div>
    <blockquote>
      <h2>{props.quote}</h2>
    </blockquote>
    <cite>{props.author}</cite>
  </div>
)
