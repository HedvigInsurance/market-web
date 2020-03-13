import * as React from 'react'
import {
  HeroImageBlockBrandPivot,
  HeroImageBlockBrandPivotProps,
} from './HeroImageBlockBrandPivot'
import { MarkdownHtmlComponent, MinimalColorComponent } from '../BaseBlockProps'

export default {
  title: 'Blocks/HeroBlock',
  component: HeroImageBlockBrandPivot,
}

const heroText: MarkdownHtmlComponent = {
  _uid: '1234',
  html:
    '<p>Hedvig är framtidens försäkring. Medan traditionella försäkringsbolag försäkrar prylar, hjälper vi människor. Vi finns specifikt för dig i behov av omedelbar hjälp, oavsett var du befinner dig.</p>',
  original:
    '<p>Hedvig är framtidens försäkring. Medan traditionella försäkringsbolag försäkrar prylar, hjälper vi människor. Vi finns specifikt för dig i behov av omedelbar hjälp, oavsett var du befinner dig.</p>',
  plugin: 'markdown-html',
}

const color: MinimalColorComponent = {
  _uid: '6ecde11d-ba0a-48fb-9b7b-e6dbf31415d9',
  color: 'standard-inverse',
  plugin: 'hedvig_minimal_color_picker',
}

const heroProps: HeroImageBlockBrandPivotProps = {
  _uid: '5678',
  component: 'hero_block',
  headline: 'Säg hej till Hedvig',
  indented_text: heroText,
  image: '',
  image_mobile: '',
  color: color,
}

const image = 'https://cdn.hedvig.com/www/referrals/referrals-clean.png'

export const Default = () => <HeroImageBlockBrandPivot {...heroProps} />
export const WithImage = () => (
  <HeroImageBlockBrandPivot {...heroProps} image={image} image_mobile={image} />
)
