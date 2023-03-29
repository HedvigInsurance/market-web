import * as Koa from 'koa'
import { Middleware } from 'koa'
import { IMiddleware } from 'koa-router'
import { Logger } from 'typescript-logging'
import { lookupCountry } from 'server/utils/ip2location'
import { getDatasourceEntries } from 'server/utils/storyblok'
import { DatasourceEntry } from 'storyblok/StoryContainer'
import { locales } from 'l10n/locales'
import { fallbackLocale } from 'l10n/l10n-utils'
import { newSiteAbTest } from 'newSiteAbTest'
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

export const geoRedirect = (
  path: string,
  fallbackCountryLabel = fallbackLocale.label,
): IMiddleware<void> => async (ctx) => {
  const countryLabel =
    lookupCountry(ctx.ip)?.toLowerCase() || fallbackCountryLabel
  const queryStringMaybe = ctx.querystring ? '?' + ctx.querystring : ''

  ctx.status = 301

  if (Object.keys(locales).includes(countryLabel)) {
    ctx.redirect(`/${countryLabel}${path}${queryStringMaybe}`)
  } else {
    ctx.redirect(`/${fallbackCountryLabel}${path}${queryStringMaybe}`)
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

export const abTestingRedirects: IMiddleware<State> = async (ctx, next) => {
  const logger = ctx.state.getLogger('request') as Logger

  const redirect = newSiteAbTest.redirects.find((item) =>
    item.source.test(ctx.path),
  )
  const isEligiblePage = redirect !== undefined

  let userEligibleCookie = ctx.cookies.get(newSiteAbTest.cookies.eligible.name)
  if (typeof userEligibleCookie === 'undefined') {
    userEligibleCookie = JSON.stringify(isEligiblePage)
    logger.info(
      `First page in session, eligible for experiment = ${isEligiblePage}`,
    )
    const { name, maxAge } = newSiteAbTest.cookies.eligible
    ctx.cookies.set(name, userEligibleCookie, {
      httpOnly: true,
      maxAge,
    })
  }
  // Ignore non-eligible users (started session not on test page) and pages
  if (!isEligiblePage || userEligibleCookie !== 'true') {
    await next()
    return
  }

  const variantCookie = ctx.cookies.get(newSiteAbTest.cookies.variant.name)
  let variant
  if (typeof variantCookie === 'undefined') {
    const newSiteWeight = getNewSiteWeight()
    variant = Math.random() * 100 < newSiteWeight ? 1 : 0
    logger.info(
      `AB redirect, new site weight: ${newSiteWeight}, selected variant: ${variant}`,
    )
    ctx.cookies.set(newSiteAbTest.cookies.variant.name, String(variant), {
      maxAge: newSiteAbTest.cookies.variant.maxAge,
      httpOnly: false,
    })
  } else {
    variant = parseInt(variantCookie, 10)
  }

  const targetOrigin = process.env.AB_REDIRECT_ORIGIN
  const shouldRedirect = targetOrigin && variant === 1
  if (redirect && shouldRedirect) {
    const targetPath = redirect.destination ?? ctx.path
    const targetUrl = new URL(`${targetOrigin}${targetPath}`)
    targetUrl.searchParams.set(
      newSiteAbTest.experimentQueryParam,
      `${newSiteAbTest.optimizeExperimentId}.${variant}`,
    )
    logger.info(`Performing AB redirect to ${targetUrl.toString()}`)
    ctx.redirect(targetUrl.toString())
  }
  await next()
}

const getNewSiteWeight = (): number => {
  const newSiteWeight = parseInt(
    process.env[`AB_REDIRECT_WEIGHT_NEW_SITE`] ?? '0',
    10,
  )
  return isNaN(newSiteWeight) ? 0 : newSiteWeight
}
