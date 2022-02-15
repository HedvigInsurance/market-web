import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { QuoteBlock } from 'blocks/QuoteBlock/QuoteBlock'

export default {
  title: 'Blocks/QuoteBlock',
  component: QuoteBlock,
  decorators: [withKnobs],
}

const quoteProps = {
  _uid: '5678',
  component: 'quote_block',
}

export const Default = () => (
  <QuoteBlock
    {...quoteProps}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    quotes={[
      {
        _uid: 'a',
        quote: text(
          'Quote',
          '”My boyfriend got sick while I was on vacation, Hedvig flew me home and also kept in touch with the hospital. I’m overwhelmed.”',
        ),
        author: text('Author', '– Cecilia Jansson'),
        large_quote: boolean('Large quote', false),
      },
    ]}
  />
)
