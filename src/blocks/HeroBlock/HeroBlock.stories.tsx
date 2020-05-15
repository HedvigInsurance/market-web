import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import StoryRouter from 'storybook-react-router'
import { fontSizes, globalStoryMock, minimalColorMap } from 'utils/storybook'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { HeroBlock } from './HeroBlock'

export default {
  title: 'Blocks/HeroBlock',
  component: HeroBlock,
  decorators: [withKnobs, StoryRouter()],
}

const heroText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p>Omfattande skydd för dig, din lägenhet och dina saker. Bostadsrättstillägg ingår alltid.</p>',
  original:
    '<p>Omfattande skydd för dig, din lägenhet och dina saker. Bostadsrättstillägg ingår alltid.</p>',
  plugin: 'markdown-html',
}

const heroProps = {
  _uid: '5678',
  component: 'hero_block',
  image: '',
  image_mobile: '',
  story: globalStoryMock,
}

const image =
  'https://source.unsplash.com/user/heytowner/?orientation=landscape'

export const Default = () => (
  <HeroBlock
    {...heroProps}
    headline="Bostadsrätt"
    text={heroText}
    headline_font_size_mobile={select('Font size mobile', fontSizes, 'lg')}
    headline_font_size={select('Font size', fontSizes, 'lg')}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    text_color={
      minimalColorMap[
        select('Text color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    text_position={select('Text position', ['left', 'center', 'right'], 'left')}
    image={image}
    image_mobile={image}
    show_hedvig_wordmark={boolean('Show Hedvig wordmark', false)}
  />
)

export const WithCTA = () => (
  <HeroBlock
    {...heroProps}
    headline="Hjälp så som du aldrig kunnat <br/>föreställa dig den"
    headline_font_size_mobile={select('Font size mobile', fontSizes, 'md')}
    headline_font_size={select('Font size', fontSizes, 'sm')}
    show_cta={true}
    cta_label="Läs mer"
    cta_style="outlined"
    cta_color={minimalColorMap['standard-inverse']}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    text_color={
      minimalColorMap[
        select('Text color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    text_position={select('Text position', ['left', 'center', 'right'], 'left')}
    image={image}
    show_hedvig_wordmark={boolean('Show Hedvig wordmark', false)}
  />
)

export const WithoutImage = () => (
  <HeroBlock
    {...heroProps}
    headline="Hjälp så som du aldrig kunnat föreställa dig den"
    headline_font_size_mobile={select('Font size mobile', fontSizes, 'lg')}
    headline_font_size={select('Font size', fontSizes, 'lg')}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    text_color={
      minimalColorMap[
        select('Text color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    show_hedvig_wordmark={boolean('Show Hedvig wordmark', false)}
  />
)
