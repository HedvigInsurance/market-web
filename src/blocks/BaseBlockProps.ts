import { SectionSize } from '../utils/SectionSize'

export type colorComponentColors =
  | 'standard'
  | 'blue'
  | 'blue-dark'
  | 'pink-light'
  | 'pink-dark'
  | 'off-white'
  | 'off-black'
  | 'off-black-dark'
  | 'green'
  | 'green-dark'
  | 'purple'
  | 'yellow-light'
  | 'yellow-dark'

export interface ColorComponent {
  _uid: string
  plugin: 'hedvig_limited_color_picker'
  color: colorComponentColors
}

export interface BaseBlockProps {
  _uid: string
  component: string
  color?: ColorComponent
  size: SectionSize
}

export interface MarkdownHtmlComponent {
  _uid: string
  html: string
  original: string
  plugin: 'markdown-html'
}
