import { select, withKnobs, boolean } from '@storybook/addon-knobs'
import * as React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'

export default {
  title: 'Blocks/BulletPointBlock',
  component: BulletPointBlock,
  decorators: [withKnobs],
}

const text: MarkdownHtmlComponent = {
  _uid: '5',
  html:
    '<p>Hedvig has an ‘Excellent’ rating from Trustpilot with 4,8/5 stars based on 1000+ reviews.</p>',
  original:
    '<p>Hedvig has an ‘Excellent’ rating from Trustpilot with 4,8/5 stars based on 1000+ reviews.</p>',
  plugin: 'markdown-html',
}

const text2: MarkdownHtmlComponent = {
  _uid: '4ef15d68-6bc5-4c0d-9909-ec778fd3a34e',
  html:
    '<p>Record your claim in the Hedvig app and get immediate compensation for the simplest claims. No paperwork, no queues, no call</p>\n<p><a href="">Learn more</a></p>\n',
  plugin: 'markdown-html',
  original:
    'Record your claim in the Hedvig app and get immediate compensation for the simplest claims. No paperwork, no queues, no call\n\n[Learn more]()',
}

const bulletPointsIcon = [
  {
    _uid: '4678',
    component: 'bullet_point_item',
    image: 'icons/hedvig_reviews_trustpilot.svg',
    icon_layout: false,
    title: 'Trustpilot rating: Excellent',
    paragraph: text,
  },
  {
    _uid: '9678',
    component: 'bullet_point_item',
    image: 'icons/hedvig_reviews_apple.svg',
    icon_layout: true,
    title: 'iOS app rating: 4,7/5 stars',
    paragraph: text,
  },
  {
    _uid: '1678',
    component: 'bullet_point_item',
    image: 'icons/hedvig_reviews_claims_rating.svg',
    icon_layout: true,
    title: 'Claims rating: 4,7/5 stars',
    paragraph: text,
  },
]

const bulletPointBlockIconProps = {
  _uid: '9123',
  component: 'bullet_point_block',
  bullet_points: bulletPointsIcon,
}

const bulletPointsImage = [
  {
    _uid: '5678',
    component: 'bullet_point_item',
    image: 'images/square_couch.jpg',
    icon_layout: false,
    title: 'Make a claim anytime',
    paragraph: text2,
  },
  {
    _uid: '3678',
    component: 'bullet_point_item',
    image: 'images/square_rental.jpg',
    icon_layout: true,
    title: 'Get instant help',
    paragraph: text2,
  },
  {
    _uid: '6678',
    component: 'bullet_point_item',
    image: 'images/square_sofa.jpg',
    icon_layout: true,
    title: 'Follow your claim',
    paragraph: text2,
  },
  {
    _uid: '6378',
    component: 'bullet_point_item',
    image: 'images/square_sofa.jpg',
    icon_layout: true,
    title: 'Payouts in no time',
    paragraph: text2,
  },
]

const bulletPointBlockImageProps = {
  _uid: '9123',
  component: 'bullet_point_block',
  bullet_points: bulletPointsImage,
}

export const Default = () => (
  <BulletPointBlock
    {...bulletPointBlockIconProps}
    align_center={boolean('Align center', true)}
    bullet_point_layout={boolean('Bullet point layout', false)}
    color={
      minimalColorMap[select('Color', Object.keys(minimalColorMap), 'standard')]
    }
    color_body={
      minimalColorMap[
        select('Color body', Object.keys(minimalColorMap), 'gray700')
      ]
    }
    size={select('Block size', ['none', 'sm', 'lg', 'xl'], 'sm')}
  />
)

export const WithImage = () => (
  <BulletPointBlock
    {...bulletPointBlockImageProps}
    align_center={boolean('Align center', false)}
    bullet_point_layout={boolean('Bullet point layout', false)}
    color={
      minimalColorMap[select('Color', Object.keys(minimalColorMap), 'standard')]
    }
    color_body={
      minimalColorMap[
        select('Color body', Object.keys(minimalColorMap), 'gray700')
      ]
    }
    size={select('Block size', ['none', 'sm', 'lg', 'xl'], 'sm')}
  />
)
