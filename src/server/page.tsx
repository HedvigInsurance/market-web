import fs from 'fs'
import path from 'path'
import { AxiosError } from 'axios'
import { Provider } from 'constate'
import { renderStylesToString } from 'emotion-server'
import { IMiddleware, RouterContext } from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouterContext } from 'react-router'
import { StaticRouter } from 'react-router-dom'
import { Logger } from 'typescript-logging'
import { State } from 'server/middlewares/states'
import {
  getDraftedStoryById,
  getGlobalStory,
  getPublishedStoryFromSlug,
  getStoryblokEditorScript,
} from 'server/utils/storyblok'
import { LocaleData } from 'l10n/locales'
import { fallbackLocale, getLocaleData } from 'l10n/l10n-utils'
import { LocaleProvider } from 'context/LocaleContext'
import { App } from '../App'
import { favicons } from './utils/favicons'
import { allTracking, gtmDevScript, gtmProdScript } from './utils/tracking'

const scriptLocation =
  process.env.NODE_ENV === 'production'
    ? '/static/' +
      JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, '../../build/static/stats.json'),
          'utf-8',
        ),
      ).assetsByChunkName.app[0]
    : '/static/app.js'

interface Template {
  body: string
  helmet: FilledContext['helmet']
  initialState: any
  currentLocale: LocaleData
  shouldDangerouslyExposeApiKeyToProvideEditing: boolean
  nonce: string
}

const template = ({
  body,
  helmet,
  initialState,
  currentLocale,
  shouldDangerouslyExposeApiKeyToProvideEditing,
  nonce,
}: Template) => `
  <!doctype html>
  <html lang="${initialState.context.currentLocale.htmlLang}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="google-site-verification" content="PRWwImA4PRHRb-5JN4yx7nIqYqtKQ699fcMo2ZOsRW0" />
    <meta name="google-site-verification" content="vyJz48ojQHtV9m0aaTEAySwZwVUfAGDAWU6zr7SD5qo" />
    ${helmet.base}
    ${helmet.title}
    ${helmet.link}
    ${helmet.meta}
    ${helmet.style}
    ${helmet.script}
    
    ${allTracking(nonce, process.env.APP_ENVIRONMENT)}
    ${favicons}
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,400i&display=swap" rel="stylesheet">
    <!-- TrustBox script -->
    <script type="text/javascript" src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js" async></script>
    <!-- End TrustBox script -->
  </head>
  <body>
    ${
      process.env.APP_ENVIRONMENT === 'production'
        ? gtmProdScript.body
        : gtmDevScript.body
    }

    ${
      shouldDangerouslyExposeApiKeyToProvideEditing
        ? getStoryblokEditorScript(nonce)
        : ''
    }
    <div id="react-root">${body}</div>
      <script nonce="${nonce}">
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      window.__CURRENT_LOCALE__ = ${JSON.stringify(currentLocale)};
      window.PUBLIC_HOST = ${JSON.stringify(process.env.PUBLIC_HOST || '')};
      window.GIRAFFE_ENDPOINT = ${JSON.stringify(
        process.env.GIRAFFE_ENDPOINT ||
          'https://graphql.dev.hedvigit.com/graphql',
      )};
      window.APP_ENVIRONMENT = ${JSON.stringify(
        process.env.APP_ENVIRONMENT || 'development',
      )};
      window.DATADOG_CONFIG = ${JSON.stringify({
        applicationId: process.env.DATADOG_APPLICATION_ID,
        clientToken: process.env.DATADOG_CLIENT_TOKEN,
        version: process.env.HEROKU_SLUG_COMMIT,
      })};
      window.STORYBLOK_API_TOKEN =${JSON.stringify(
        process.env.STORYBLOK_API_TOKEN || '',
      )};
      </script>
    <script src="${scriptLocation}"></script>
    <div id="modal></div>
  </body>
  </html>
`

const getStoryblokResponseFromContext = async (ctx: RouterContext<State>) => {
  try {
    if (
      ctx.request.query._storyblok &&
      ctx.request.query['_storyblok_tk[timestamp]']
    ) {
      const id = ctx.request.query._storyblok
      let contentVersion = ctx.request.query['_storyblok_tk[timestamp]']
      if (Array.isArray(contentVersion)) {
        contentVersion = contentVersion[0]
      }
      ;(ctx.state.getLogger('storyblok') as Logger).info(
        `Getting drafted story [id=${id}, cv=${contentVersion}]`,
      )
      return await getDraftedStoryById(ctx.request.path, contentVersion)
    } else {
      const bypassCache = Boolean(ctx.query._storyblok_published)
      ;(ctx.state.getLogger('storyblok') as Logger).info(
        `Getting published story from slug [slug="${
          ctx.request.path
        }", bypass_cache=${String(bypassCache)}]`,
      )
      return await getPublishedStoryFromSlug(ctx.request.path, bypassCache)
    }
  } catch (e) {
    if ((e as AxiosError).response && e.response.status === 404) {
      return
    } else {
      throw e
    }
  }
}

export const getLocaleFromPath = (path: string) => {
  return path.split('/')[1]
}

export const getPageMiddleware = (
  ignoreStoryblokMiss: boolean,
): IMiddleware<State> => async (ctx, next) => {
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}

  const localeFromPath = getLocaleFromPath(ctx.path)
  const locale = localeFromPath || fallbackLocale.label

  const [story, globalStory] = await Promise.all([
    getStoryblokResponseFromContext(ctx),
    getGlobalStory(
      locale,
      Boolean(
        ctx.request.query['_storyblok_tk[timestamp]'] ||
          ctx.query._storyblok_published,
      ),
    ),
  ])

  if (!globalStory?.story && !ctx.query._storyblok) {
    ctx.redirect(`/se${ctx.originalUrl}`)
    return
  }

  if (localeFromPath === 'en' && !ctx.query._storyblok) {
    ctx.redirect(ctx.originalUrl.replace(/^\/en/, '/se-en'))
    return
  }

  if (!story && !ignoreStoryblokMiss) {
    await next()
    return
  }

  const currentLocale = getLocaleData(locale as LocaleData['label'])

  const initialState = JSON.parse(
    JSON.stringify({
      story,
      globalStory,
      context: { currentLocale },
    }).replace(/\u2028/g, ' '),
  )
  const serverApp = (
    <Provider initialState={initialState}>
      <LocaleProvider currentLocale={currentLocale}>
        <StaticRouter
          location={ctx.request.originalUrl}
          context={routerContext}
        >
          <HelmetProvider context={helmetContext}>
            <App nonce={(ctx.res as any).cspNonce} />
          </HelmetProvider>
        </StaticRouter>
      </LocaleProvider>
    </Provider>
  )

  const body = renderStylesToString(renderToString(serverApp))

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  if (ctx.request.headers.accept === 'application/json') {
    ctx.body = initialState
    return
  }

  ctx.body = template({
    body,
    initialState,
    currentLocale,
    helmet: (helmetContext as FilledContext).helmet,
    shouldDangerouslyExposeApiKeyToProvideEditing: Boolean(
      ctx.request.query._storyblok,
    ),
    nonce: (ctx.res as any).cspNonce,
  })
}
