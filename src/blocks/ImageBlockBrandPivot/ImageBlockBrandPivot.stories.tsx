import React from 'react'
import { Image as ImageType } from '../../utils/storyblok'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { ImageBlockBrandPivot } from './ImageBlockBrandPivot'

const image: ImageType =
  'https://cdn.hedvig.com/www/referrals/referrals-clean.png'

export default {
  title: 'Blocks/ImageBlock',
  component: ImageBlockBrandPivot,
  parameters: {
    paddings: [
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px', default: true },
    ],
  },
}

const caption: MarkdownHtmlComponent = {
  _uid: '5',
  html: '<p>Bildtext</p><p>Stockholm, 2020</p>',
  original: '<p>Bildtext</p><p>Stockholm, 2020</p>',
  plugin: 'markdown-html',
}

export const Default = () => (
  <ImageBlockBrandPivot _uid="5678" component="image_block" image={image} />
)

export const WithCaption = () => (
  <ImageBlockBrandPivot
    _uid="5678"
    component="image_block"
    image={image}
    caption={caption}
  />
)
