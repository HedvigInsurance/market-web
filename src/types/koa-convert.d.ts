declare module 'koa-convert' {
  import { Context, Middleware } from 'koa'

  const convert: (
    mw: (context: Context, next: () => Promise<any>) => Generator,
  ) => Middleware

  export = convert
}
