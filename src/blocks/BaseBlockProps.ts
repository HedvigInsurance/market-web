import { SectionSize } from '../utils/SectionSize'

export type colorComponentColors =
  | 'standard'
  | 'standard-inverse'
  | 'blue'
  | 'blue-inverse'
  | 'blue-dark'
  | 'blue-dark-inverse'
  | 'pink-light'
  | 'pink-light-inverse'
  | 'pink-dark'
  | 'pink-dark-inverse'
  | 'off-white'
  | 'off-white-inverse'
  | 'off-black'
  | 'off-black-inverse'
  | 'off-black-dark'
  | 'off-black-dark-inverse'
  | 'green'
  | 'green-inverse'
  | 'green-dark'
  | 'green-dark-inverse'
  | 'purple'
  | 'purple-inverse'
  | 'yellow-light'
  | 'yellow-light-inverse'
  | 'yellow-dark'
  | 'yellow-dark-inverse'

export type colorDeviationColors =
  | 'pink-deviation-100'
  | 'pink-deviation-100-inverse'
  | 'pink-deviation-200-black'
  | 'pink-deviation-200-black-inverse'
  | 'pink-deviation-200-white'
  | 'pink-deviation-200-white-inverse'
  | 'yellow-deviation-100-black'
  | 'yellow-deviation-100-black-inverse'
  | 'yellow-deviation-100-white'
  | 'yellow-deviation-100-white-inverse'
  | 'blue-deviation-100'
  | 'blue-deviation-100-inverse'
  | 'purple-deviation-100'
  | 'purple-deviation-100-inverse'

export interface ColorComponent {
  _uid: string
  plugin: 'hedvig_limited_color_picker'
  color: colorComponentColors
}

export interface BaseBlockProps {
  _uid: string
  component: string
  color?: ColorComponent
  size?: SectionSize
  extra_styling?: string
  index: number
}

export interface MarkdownHtmlComponent {
  _uid: string
  html: string
  original: string
  plugin: 'markdown-html'
}
