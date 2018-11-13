import * as React from 'react'
import { BaseBlock } from './BaseBlock'

export interface SingleQuoteSectionProps extends BaseBlock {
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
