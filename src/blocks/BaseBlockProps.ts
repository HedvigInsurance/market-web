import { SectionSize } from '../utils/SectionSize'

export type minimalColorComponentColors =
  | 'standard'
  | 'standard-inverse'
  | 'gray700'
  | 'gray500-inverse'
  | 'purple300'
  | 'purple500'

export interface MinimalColorComponent {
  _uid: string
  plugin: 'hedvig_minimal_color_picker'
  color: minimalColorComponentColors
}

export interface BaseBlockProps {
  _uid: string
  _editable?: string
  component: string
  size?: SectionSize
  extra_styling?: string
  index?: number
  color?: MinimalColorComponent
}

export interface MarkdownHtmlComponent {
  _uid: string
  html: string
  original: string
  plugin: 'markdown-html'
}

export interface TextField {
  _uid: string
  text: string
  component: string
}
