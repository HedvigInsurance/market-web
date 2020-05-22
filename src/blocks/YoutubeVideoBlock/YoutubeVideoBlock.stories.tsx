import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { YoutubeVideoBlock } from './YoutubeVideoBlock'

export default {
  title: 'Blocks/YoutubeVideoBlock',
  component: YoutubeVideoBlock,
  decorators: [withKnobs],
}

const image =
  'https://source.unsplash.com/user/heytowner/?orientation=landscape'

const videoProps = {
  _uid: '5678',
  component: 'youtube_block',
  video_id: 'CWRTqMGvdpc',
}

export const Default = () => (
  <YoutubeVideoBlock
    {...videoProps}
    color={minimalColorMap.standard}
    overlay_image={image}
  />
)
