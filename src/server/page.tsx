import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { AxiosError } from 'axios'
import { Provider } from 'constate'
import { renderStylesToString } from 'emotion-server'
import { IMiddleware, RouterContext } from 'koa-router'
import path from 'path'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { State } from 'server/middlewares/states'
import { getLangFromPath } from 'server/utils/storyblok'
import { Logger } from 'typescript-logging'
import { App } from '../App'
import { sentryConfig } from './config/sentry'
import { favicons } from './utils/favicons'
import {
  getDraftedStoryById,
  getGlobalStory,
  getPublishedStoryFromSlug,
  getStoryblokEditorScript,
} from './utils/storyblok'
import { allTracking } from './utils/tracking'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})

interface Template {
  body: string
  helmet: FilledContext['helmet']
  initialState: any
  dangerouslyExposeApiKeyToProvideEditing: boolean
  nonce: string
  lang: string
}

const template = ({
  body,
  helmet,
  initialState,
  dangerouslyExposeApiKeyToProvideEditing,
  nonce,
  lang,
}: Template) => `
  <!doctype html>
  <html lang="${lang}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="google-site-verification" content="vyJz48ojQHtV9m0aaTEAySwZwVUfAGDAWU6zr7SD5qo" />
    ${helmet.base}
    ${helmet.title}
    ${helmet.link}
    ${helmet.meta}
    ${helmet.style}
    ${helmet.script}
    
    ${allTracking(nonce)}
    ${favicons}
    <script src="https://browser.sentry-cdn.com/4.2.3/bundle.min.js" crossorigin="anonymous"></script>
    <script nonce="${nonce}">
      Sentry.init(${JSON.stringify(sentryConfig())})
    </script>
    <script defer src="https://adtr.io/jsTag?ap=1412531808"></script>
    <link href="https://fonts.googleapis.com/css?family=EB+Garamond:400,400i&display=swap" rel="stylesheet">
  </head>
  <body>
    ${
      dangerouslyExposeApiKeyToProvideEditing
        ? getStoryblokEditorScript(nonce)
        : ''
    }
    <div id="react-root">${body}</div>
      <script nonce="${nonce}">
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      window.PUBLIC_HOST = ${JSON.stringify(process.env.PUBLIC_HOST || '')};
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
      const contentVersion = ctx.request.query['_storyblok_tk[timestamp]']
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

export const getPageMiddleware = (
  ignoreStoryblokMiss: boolean,
): IMiddleware<State> => async (ctx, next) => {
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}

  const langFromPath = getLangFromPath(ctx.path)
  const lang = langFromPath || 'se'

  const [story, globalStory] = await Promise.all([
    getStoryblokResponseFromContext(ctx),
    getGlobalStory(
      lang,
      Boolean(
        ctx.request.query['_storyblok_tk[timestamp]'] ||
          ctx.query._storyblok_published,
      ),
    ),
  ])

  // Redirect /* to /se/*
  if (!langFromPath && !ctx.query._storyblok) {
    ctx.redirect(`/se${ctx.originalUrl}`)
    return
  }

  // Redirect /sv/* to /se/*
  if (langFromPath === 'sv' && !ctx.query._storyblok) {
    ctx.redirect(ctx.originalUrl.replace(/^\/sv/, '/se'))
    return
  }

  // Redirect /en/* to /se-en/*
  if (langFromPath === 'en' && !ctx.query._storyblok) {
    ctx.redirect(ctx.originalUrl.replace(/^\/en/, '/se-en'))
    return
  }

  if (!story && !ignoreStoryblokMiss) {
    await next()
    return
  }

  // TODO: Remove after we go live
  if (langFromPath === 'sv' && !ctx.query._storyblok) {
    ctx.redirect(ctx.originalUrl.replace(/^\/sv/, ''))
    return
  }

  const serverApp = (
    <Provider
      initialState={{
        story,
        globalStory,
        context: { lang },
        ...(ctx.state.additionalStates || {}),
      }}
    >
      <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
        <HelmetProvider context={helmetContext}>
          <App nonce={(ctx.res as any).cspNonce} />
        </HelmetProvider>
      </StaticRouter>
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

  ctx.body = template({
    body,
    lang,
    initialState: {
      story,
      globalStory,
      context: { lang },
      ...(ctx.state.additionalStates || {}),
    },
    helmet: (helmetContext as FilledContext).helmet,
    dangerouslyExposeApiKeyToProvideEditing: ctx.request.query._storyblok,
    nonce: (ctx.res as any).cspNonce,
  })
}
