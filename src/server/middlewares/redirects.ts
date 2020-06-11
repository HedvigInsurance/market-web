import { Middleware } from 'koa'
import { IMiddleware } from 'koa-router'
import { lookupCountry } from 'server/utils/ip2location'
import { Logger } from 'typescript-logging'
import { State } from './states'

export const forceHost = ({
  host,
}: {
  host: string
}): Middleware<State, any> => async (ctx, next) => {
  if (ctx.get('host') !== host) {
    ;(ctx.state.getLogger('request') as Logger).info(
      `Redirecting to "${host}" because of host mismatch (got "${ctx.host}")`,
    )
    ctx.redirect(`${ctx.request.protocol}://${host}${ctx.request.originalUrl}`)
    ctx.status = 301
    return
  }

  await next()
}

export const startPageRedirect: IMiddleware<object> = async (ctx) => {
  const actualIp = ctx.ip
  const country = lookupCountry(actualIp)

  if (country === 'NO') {
    ctx.redirect(`/no${ctx.querystring ? '?' + ctx.querystring : ''}`)
    return
  }

  ctx.redirect(`/se${ctx.querystring ? '?' + ctx.querystring : ''}`)
}
