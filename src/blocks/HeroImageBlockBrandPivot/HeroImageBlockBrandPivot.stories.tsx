import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { fontSizes, minimalColorMap } from 'utils/storybook'
import { MarkdownHtmlComponent } from '../BaseBlockProps'
import { HeroImageBlockBrandPivot } from './HeroImageBlockBrandPivot'

export default {
  title: 'Blocks/HeroBlock',
  component: HeroImageBlockBrandPivot,
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

const heroProps = {
  _uid: '5678',
  component: 'hero_block',
  headline: 'Säg hej till Hedvig',
  text: heroText,
  image: '',
  image_mobile: '',
}

const image = 'https://cdn.hedvig.com/www/referrals/referrals-clean.png'

export const Default = () => (
  <HeroImageBlockBrandPivot
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
  <HeroImageBlockBrandPivot
    {...heroProps}
    image={image}
    image_mobile={image}
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
