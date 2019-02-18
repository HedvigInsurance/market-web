import * as acceptLanguageParser from 'accept-language-parser'
import { Middleware } from 'koa'

const pickLanguage = (acceptHeader: string) =>
  acceptLanguageParser.pick(['sv', 'en'], acceptHeader)
const MATCH_EN = /^\/en($|\/.+)/

export const languageRedirect: Middleware = async (ctx, next) => {
  if (ctx.cookies.get('_hv_lang_r')) {
    await next()
    return
  }

  if (
    !MATCH_EN.test(ctx.path) &&
    pickLanguage(ctx.request.headers['accept-language']) === 'en'
  ) {
    ctx.cookies.set('_hv_lang_r', 'true', {
      path: '/',
    })
    ctx.redirect(('/en/' + ctx.path).replace(/\/{2,}/, '/'))
    return
  }

  ctx.cookies.set('_hv_lang_r', 'true', {
    path: '/',
  })
  await next()
}
