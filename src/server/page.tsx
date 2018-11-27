import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import { AxiosError } from 'axios'
import { Provider } from 'constate'
import { renderStylesToString } from 'emotion-server'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
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
}

const template = ({
  body,
  helmet,
  initialState,
  dangerouslyExposeApiKeyToProvideEditing,
  nonce,
}: Template) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${helmet.title}
    ${helmet.link}
    ${helmet.meta}
    ${helmet.script}
    <script nonce="${nonce}">
    ${allTracking}
    </script>
    ${favicons}
    <script src="https://browser.sentry-cdn.com/4.2.3/bundle.min.js" crossorigin="anonymous"></script>
    <script nonce="${nonce}">
      Sentry.init(${JSON.stringify(sentryConfig())})
    </script>
  </head>
  <body>
    ${
      dangerouslyExposeApiKeyToProvideEditing
        ? getStoryblokEditorScript(nonce)
        : ''
    }
    <div id="react-root">${body}</div>
      <script nonce="${nonce}">
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
      </script>
    <script src="${scriptLocation}"></script>
  </body>
  </html>
`

const getStoryblokResponseFromContext = async (ctx: Koa.Context) => {
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
      return await getDraftedStoryById(id, contentVersion)
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

export const getPageMiddleware: Koa.Middleware = async (ctx, next) => {
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}

  const [story, globalStory] = await Promise.all([
    getStoryblokResponseFromContext(ctx),
    getGlobalStory(
      Boolean(
        ctx.request.query['_storyblok_tk[timestamp]'] ||
          ctx.query._storyblok_published,
      ),
    ),
  ])

  if (!story) {
    await next()
    return
  }

  const serverApp = (
    <Provider
      initialState={{
        story: story.data,
        globalStory: globalStory && globalStory.data,
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
    initialState: {
      story: story.data,
      globalStory: globalStory && globalStory.data,
    },
    helmet: (helmetContext as FilledContext).helmet,
    dangerouslyExposeApiKeyToProvideEditing: ctx.request.query._storyblok,
    nonce: (ctx.res as any).cspNonce,
  })
}
