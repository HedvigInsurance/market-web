declare module 'koa-proxy' {
  import { Middleware } from 'koa'

  type mapFn = (path: string) => string

  interface ProxyArgs {
    host: string
    match?: RegExp
    map?: { [source: string]: string } | mapFn
    jar?: boolean
    suppressRequestHeaders?: string[]
    suppressResponseHeaders?: string[]
  }
  const proxy: (args: ProxyArgs) => Middleware

  export = proxy
}
