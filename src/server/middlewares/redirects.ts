import { Middleware } from 'koa'
import { IMiddleware } from 'koa-router'
import { Logger } from 'typescript-logging'
import { lookupCountry } from 'server/utils/ip2location'
import { getDatasourceEntries } from 'server/utils/storyblok'
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
  const queryStringMaybe = ctx.querystring ? '?' + ctx.querystring : ''

  if (country === 'NO') {
    ctx.redirect(`/no${queryStringMaybe}`)
    return
  }

  ctx.redirect(`/se${queryStringMaybe}`)
}

export const manualRedirects: IMiddleware<State, any> = async (ctx, next) => {
  const permanentRedirects = await getDatasourceEntries('permanent-redirects')
  const temporaryRedirects = await getDatasourceEntries('temporary-redirects')

  permanentRedirects.datasource_entries.map((redirect) => {
    if (redirect.name === ctx.request.originalUrl) {
      ctx.redirect(redirect.value)
      ctx.status = 301
      return
    }
  })

  temporaryRedirects.datasource_entries.map((redirect) => {
    if (redirect.name === ctx.originalUrl) {
      ctx.redirect(redirect.value)
      ctx.status = 302
      return
    }
  })

  await next()
}
