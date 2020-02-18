import { SectionSize } from '../utils/SectionSize'

export type minimalColorComponentColors = 'standard' | 'standard-inverse'

export interface MinimalColorComponent {
  _uid: string
  plugin: 'hedvig_minimal_color_picker'
  color: minimalColorComponentColors
}

export interface BaseBlockProps {
  _uid: string
  component: string
  color?: MinimalColorComponent
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
