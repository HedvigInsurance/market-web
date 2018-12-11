import * as https from 'https'
import { Middleware } from 'koa'
import * as Url from 'url'

interface Options {
  host: string
  sanitisePath?: boolean
}

export const proxy = (options: Options): Middleware => async (ctx) => {
  const path = options.sanitisePath ? encodeURI(ctx.path) : ctx.path
  const url = new Url.URL(path, options.host)
  url.search = ctx.request.querystring

  return new Promise((resolve, reject) => {
    https.get(url.href, (response) => {
      if (response.statusCode) {
        ctx.status = response.statusCode
      }
      ctx.set('content-type', response.headers['content-type']!)
      response
        .pipe(ctx.res)
        .on('error', reject)
        .on('end', resolve)
    })
  })
}
