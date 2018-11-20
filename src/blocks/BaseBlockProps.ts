export interface BaseBlockProps {
  _uid: string
  component: string
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
