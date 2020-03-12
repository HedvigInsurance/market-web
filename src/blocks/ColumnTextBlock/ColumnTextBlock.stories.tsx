import * as React from 'react'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { ColumnTextBlock } from './ColumnTextBlock'

const exampleText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p>Vi har lagt mycket tid på att utveckla en försäkring anpassad efter hur våra medlemmar lever. Hedvig erbjuder innboforsikring, reiseforsikring eller kombo, så att du kan vara säker på att få snabb, trygg och personlig hjälp, oavsett var du befinner dig.</p>',
  original:
    '<p>Vi har lagt mycket tid på att utveckla en försäkring anpassad efter hur våra medlemmar lever. Hedvig erbjuder innboforsikring, reiseforsikring eller kombo, så att du kan vara säker på att få snabb, trygg och personlig hjälp, oavsett var du befinner dig.</p>',
  plugin: 'markdown-html',
}

export default {
  title: 'Blocks/ColumnTextBlock',
  component: ColumnTextBlock,
}
export const Default = () => (
  <ColumnTextBlock
    _uid="5678"
    component="column_text_block"
    text_one={exampleText}
    text_two={exampleText}
  />
)
