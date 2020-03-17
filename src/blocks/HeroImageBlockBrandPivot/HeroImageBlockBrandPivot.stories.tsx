import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import * as React from 'react'
import {
  MarkdownHtmlComponent,
  minimalColorComponentColors,
  MinimalColorComponent,
} from '../BaseBlockProps'
import {
  HeroImageBlockBrandPivot,
  HeroImageBlockBrandPivotProps,
} from './HeroImageBlockBrandPivot'

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

const colors: Record<string, MinimalColorComponent> = {
  standard: {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'standard',
    plugin: 'hedvig_minimal_color_picker',
  },
  'standard-inverse': {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'standard-inverse',
    plugin: 'hedvig_minimal_color_picker',
  },
  gray700: {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'gray700',
    plugin: 'hedvig_minimal_color_picker',
  },
  'gray500-inverse': {
    _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
    color: 'gray500-inverse',
    plugin: 'hedvig_minimal_color_picker',
  },
}

const heroProps: HeroImageBlockBrandPivotProps = {
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
    color={colors[select('color', Object.keys(colors), 'standard-inverse')]}
    text_color={
      colors[select('Text color', Object.keys(colors), 'standard-inverse')]
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
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    text_color={
      colors[select('Text color', Object.keys(colors), 'standard-inverse')]
    }
    show_hedvig_wordmark={boolean('Show Hedvig wordmark', false)}
    use_display_font={boolean('Use display font', false)}
  />
)
