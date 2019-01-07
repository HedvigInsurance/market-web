import * as http from 'http'
import * as https from 'https'
import { Middleware } from 'koa'
import * as Url from 'url'

interface Options {
  host: string
  sanitisePath?: boolean
  addTrailingSlash?: boolean
  testResponse?: (response: http.IncomingMessage) => boolean
}

export const proxy = (options: Options): Middleware => async (ctx) => {
  const path = options.sanitisePath ? encodeURI(ctx.path) : ctx.path

  const url = new Url.URL(
    path + (options.addTrailingSlash ? '/' : ''),
    options.host,
  )
  url.search = ctx.request.querystring

  return new Promise((resolve, reject) => {
    https.get(url.href, (response) => {
      if (options.testResponse && !options.testResponse(response)) {
        if (ctx.state.getLogger) {
          ctx.state
            .getLogger('proxy')
            .info('Bypassing proxy because response validation failed')
        }
        reject()
        return
      }

      if (response.statusCode) {
        if (ctx.state.getLogger) {
          ctx.state
            .getLogger('proxy')
            .info(`Got proxy response with status ${response.statusCode}`)
        }
        ctx.status = response.statusCode
      }
      ctx.set('content-type', response.headers['content-type']!)
      response
        .pipe(ctx.res)
        .on('error', reject)
        .on('finish', resolve)
    })
  })
}
