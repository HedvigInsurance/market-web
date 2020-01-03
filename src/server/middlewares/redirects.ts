import { Middleware } from 'koa'
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

export const redirectAcceptLanguage: Middleware = async (ctx, next) => {
  if (ctx.query['lang-redirect'] === 'disable') {
    ctx.cookies.set('_hvg_lang_redirect', 'disable', { path: '/' })
    return next()
  }

  if (ctx.path !== '/' || ctx.cookies.get('_hvg_lang_redirect') === 'disable') {
    return next()
  }

  if (!ctx.acceptsLanguages('sv')) {
    ctx.redirect('/en')
    return
  }

  return next()
}
