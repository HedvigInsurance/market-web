import { getScriptLocation } from '@hedviginsurance/web-survival-kit'
import axios from 'axios'
import { Provider } from 'constate'
import { renderStylesToString } from 'emotion-server'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { StaticRouter, StaticRouterContext } from 'react-router'
import { App } from '../App'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})

const template = (
  body: string,
  helmet: FilledContext['helmet'],
  initialState: any,
) => `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    ${helmet.title}
    ${helmet.link}
    ${helmet.meta}
  </head>
  <body>
    <div id="react-root">${body}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    <script src="${scriptLocation}"></script>
  </body>
  </html>
`

const apiClient = axios.create({
  baseURL: 'https://api.storyblok.com',
})

export const getPageMiddleware: Koa.Middleware = async (ctx) => {
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}

  const response = await apiClient.get(
    `/v1/cdn/stories${ctx.request.path === '/' ? '/home' : ctx.request.path}`,
    {
      params: {
        token: process.env.STORYBLOK_API_TOKEN,
        version: 'publish',
        cv: 1,
        find_by: 'slug',
      },
    },
  )

  const serverApp = (
    <Provider initialState={{ story: response.data }}>
      <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>
    </Provider>
  )

  const reactBody = renderStylesToString(renderToString(serverApp))

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(
    reactBody,
    (helmetContext as FilledContext).helmet,
    response.data,
  )
}
