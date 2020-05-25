import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
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

const caption: MarkdownHtmlComponent = {
  _uid: '5',
  html: '<p>Bildtext</p><p>Stockholm, 2020</p>',
  original: '<p>Bildtext</p><p>Stockholm, 2020</p>',
  plugin: 'markdown-html',
}

export const Default = () => (
  <YoutubeVideoBlock
    {...videoProps}
    color={minimalColorMap.standard}
    overlay_image={image}
    caption={caption}
  />
)
