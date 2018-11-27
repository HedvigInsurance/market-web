declare module '@segment/snippet' {
  interface SnippetOptions {
    apiKey: string
    page?: boolean
    load?: boolean
    host?: string
  }
  export function max(options: SnippetOptions): string
  export function min(options: SnippetOptions): string
}
