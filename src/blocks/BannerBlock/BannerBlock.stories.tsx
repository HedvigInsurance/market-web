import React from 'react'
import { MinimalColorComponent, MarkdownHtmlComponent } from '../BaseBlockProps'
import { BannerBlock } from './BannerBlock'

const exampleText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p><strong>Corona-viruset – <a href="https://www.hedvig.com/blog/coronaviruset">så fungerar din försäkring</a></strong></p>',
  original:
    '<p><strong>Corona-viruset – <a href="https://www.hedvig.com/blog/coronaviruset">så fungerar din försäkring</a></strong></p>',
  plugin: 'markdown-html',
}

export default {
  title: 'Blocks/Banner',
  component: BannerBlock,
}

const color: MinimalColorComponent = {
  _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
  color: 'standard',
  plugin: 'hedvig_minimal_color_picker',
}

export const Default = () => (
  <BannerBlock
    _uid="5678"
    color={color}
    component="column_text_block"
    text={exampleText}
  />
)
