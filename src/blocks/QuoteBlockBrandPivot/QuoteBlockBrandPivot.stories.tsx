import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { QuoteBlockBrandPivot } from './QuoteBlockBrandPivot'

export default {
  title: 'Blocks/QuoteBlock',
  component: QuoteBlockBrandPivot,
  decorators: [withKnobs],
}

const heroText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p>Hedvig är framtidens försäkring. Medan traditionella försäkringsbolag försäkrar prylar, hjälper vi människor. Vi finns specifikt för dig i behov av omedelbar hjälp, oavsett var du befinner dig.</p>',
  original:
    '<p>Hedvig är framtidens försäkring. Medan traditionella försäkringsbolag försäkrar prylar, hjälper vi människor. Vi finns specifikt för dig i behov av omedelbar hjälp, oavsett var du befinner dig.</p>',
  plugin: 'markdown-html',
}

const quoteProps = {
  _uid: '5678',
  component: 'quote_block',
}

export const Default = () => (
  <QuoteBlockBrandPivot
    {...quoteProps}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    quotes={[
      {
        quote: text(
          'Quote',
          '”My boyfriend got sick while I was on vacation, Hedvig flew me home and also kept in touch with the hospital. I’m overwhelmed.”',
        ),
        author: text('Author', 'Cecilia Jansson'),
        large_quote: boolean('Large quote', false),
      },
    ]}
  />
)
