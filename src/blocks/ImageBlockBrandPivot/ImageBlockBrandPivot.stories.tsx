import * as React from 'react'
import { Image as ImageType } from '../../utils/storyblok'
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

export const Default = () => (
  <ImageBlockBrandPivot _uid="5678" component="image_block" image={image} />
)

export const WithCaption = () => (
  <ImageBlockBrandPivot
    _uid="5678"
    component="image_block"
    image={image}
    caption="This is a caption"
    caption_shadow
  />
)
