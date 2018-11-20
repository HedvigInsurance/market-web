export type colorComponentColors =
  | 'standard'
  | 'blue'
  | 'blue-dark'
  | 'pink-light'
  | 'off-white'
  | 'green'
  | 'purple'

export interface ColorComponent {
  _uid: string
  plugin: 'hedvig_limited_color_picker'
  color: colorComponentColors
}

export interface BaseBlockProps {
  _uid: string
  component: string
  color?: ColorComponent
}

export interface MarkdownHtmlComponent {
  _uid: string
  html: string
  original: string
  plugin: 'markdown-html'
}

export interface NativeColorPickerComponent {
  _uid: string
  color: string
  plugin: 'native-color-picker'
}
