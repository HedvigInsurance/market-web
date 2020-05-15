import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import StoryRouter from 'storybook-react-router'
import { fontSizes, globalStoryMock, minimalColorMap } from 'utils/storybook'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { Hero } from './HeroImageBlockBrandPivot'

export default {
  title: 'Blocks/HeroBlockBrandPivot',
  component: Hero,
  decorators: [withKnobs, StoryRouter()],
}

const heroText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p>Hedvig är framtidens försäkring. Medan traditionella försäkringsbolag försäkrar prylar, hjälper vi människor. Vi finns specifikt för dig i behov av omedelbar hjälp, oavsett var du befinner dig.</p>',
  original:
    '<p>Hedvig är framtidens försäkring. Medan traditionella försäkringsbolag försäkrar prylar, hjälper vi människor. Vi finns specifikt för dig i behov av omedelbar hjälp, oavsett var du befinner dig.</p>',
  plugin: 'markdown-html',
}

const heroProps = {
  _uid: '5678',
  component: 'hero_block',
  headline: 'Säg hej till Hedvig',
  text: heroText,
  image: '',
  image_mobile: '',
  story: globalStoryMock,
}

const image =
  'https://source.unsplash.com/user/heytowner/?orientation=landscape'

export const Default = () => (
  <Hero
    {...heroProps}
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
    use_display_font={boolean('Use display font', false)}
  />
)
export const WithImage = () => (
  <Hero
    {...heroProps}
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
    image={image}
    show_hedvig_wordmark={boolean('Show Hedvig wordmark', false)}
    use_display_font={boolean('Use display font', false)}
  />
)
