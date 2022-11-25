import * as Koa from 'koa'
import { Middleware } from 'koa'
import { IMiddleware } from 'koa-router'
import { Logger } from 'typescript-logging'
import { lookupCountry } from 'server/utils/ip2location'
import { getDatasourceEntries } from 'server/utils/storyblok'
import { DatasourceEntry } from 'storyblok/StoryContainer'
import { locales } from 'l10n/locales'
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

export const geoRedirect = (path: string): IMiddleware<void> => async (ctx) => {
  const countryLabel = lookupCountry(ctx.ip)?.toLowerCase()
  const queryStringMaybe = ctx.querystring ? '?' + ctx.querystring : ''

  ctx.status = 301

  if (countryLabel && Object.keys(locales).includes(countryLabel)) {
    ctx.redirect(`/${countryLabel}${path}${queryStringMaybe}`)
  }
}

const triggerRedirect = (
  redirect: DatasourceEntry,
  ctx: Koa.ParameterizedContext,
  status: 301 | 302,
) => {
  const queryStringMaybe = ctx.querystring ? '?' + ctx.querystring : ''
  ctx.redirect(`${redirect.value}${queryStringMaybe}`)
  ctx.status = status
}

export const manualRedirects: IMiddleware<State, any> = async (ctx, next) => {
  const permanentRedirects = await getDatasourceEntries('permanent-redirects')
  const temporaryRedirects = await getDatasourceEntries('temporary-redirects')

  const permanentRedirect = permanentRedirects.datasource_entries.find(
    (redirect) => redirect.name === ctx.path,
  )

  if (permanentRedirect) {
    triggerRedirect(permanentRedirect, ctx, 301)
    return
  }

  const temporaryRedirect = temporaryRedirects.datasource_entries.find(
    (redirect) => redirect.name === ctx.path,
  )

  if (temporaryRedirect) {
    triggerRedirect(temporaryRedirect, ctx, 302)
    return
  }

  await next()
}

const AB_COOKIE_MAX_AGE = 7 * 24 * 3600 * 1000
type AbRedirect = {
  // Use in env variables
  id: string
  // Take this from Google Optimize
  optimizeExperimentId: string
  sourcePath: string
  redirectPath: string
}
// Keep short (<15 entries) or refactor to use map lookup
const AB_REDIRECTS: AbRedirect[] = [
  {
    id: 'SE_INDEX',
    optimizeExperimentId: 'L2us-_SfSueXuS-p8uyV3A',
    sourcePath: '/se',
    redirectPath: '/se',
  },
]
export const abTestingRedirects: IMiddleware<State> = async (ctx, next) => {
  const redirectForPath = AB_REDIRECTS.find((x) => x.sourcePath === ctx.path)
  if (redirectForPath) {
    const logger = ctx.state.getLogger('request') as Logger
    const experimentCookieName = `HEDVIG_EXP_${redirectForPath.optimizeExperimentId}`
    const cookie = ctx.cookies.get(experimentCookieName)
    let shouldRedirect
    if (!cookie) {
      const newSiteWeight = getNewSiteWeight(redirectForPath.id)
      const variant = Math.random() * 100 < newSiteWeight ? 1 : 0
      logger.info(
        `AB redirect id: ${redirectForPath.id} new site weight: ${newSiteWeight}, selected variant: ${variant}`,
      )
      shouldRedirect = variant === 1
      ctx.cookies.set(experimentCookieName, String(variant), {
        httpOnly: true,
        // TODO: Do we need .hedvig.com cookie domain to report experiment impressions or should we do it via URL params?
        maxAge: AB_COOKIE_MAX_AGE,
      })
    } else {
      const variant = parseInt(cookie, 10)
      shouldRedirect = variant === 1
    }
    if (shouldRedirect) {
      const targetOrigin = process.env.AB_REDIRECT_ORIGIN
      if (targetOrigin) {
        const targetUrl = `${targetOrigin}${redirectForPath.redirectPath}`
        logger.info(`Performing AB redirect to ${targetUrl}`)
        ctx.redirect(targetUrl)
      }
    }
  }
  await next()
}

const getNewSiteWeight = (redirectId: string): number => {
  const newSiteWeight = parseInt(
    process.env[`AB_REDIRECT_WEIGHT_${redirectId}`] ?? '0',
    10,
  )
  return isNaN(newSiteWeight) ? 0 : newSiteWeight
}
