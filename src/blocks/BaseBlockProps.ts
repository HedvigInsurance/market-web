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
