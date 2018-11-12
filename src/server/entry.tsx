import * as dotenv from 'dotenv'
dotenv.config()

import 'source-map-support/register'

import {
  // tslint:disable-line ordered-imports
  createKoaServer,
  getScriptLocation,
} from '@hedviginsurance/web-survival-kit'

import { renderStylesToString } from 'emotion-server'
import * as Koa from 'koa'
import * as path from 'path'
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, StaticRouterContext } from 'react-router'

import { FilledContext, HelmetProvider } from 'react-helmet-async'
import { App } from '../App'
import { routes } from '../routes'
import { appLogger } from './logging'

import {
  logRequestMiddleware,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './middlewares/enhancers'

const scriptLocation = getScriptLocation({
  statsLocation: path.resolve(__dirname, 'assets'),
  webpackPublicPath: process.env.WEBPACK_PUBLIC_PATH || '',
})

const template = (body: string, helmet: FilledContext['helmet']) => `
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
    <script src="${scriptLocation}"></script>
  </body>
  </html>
`

const getPageMiddleware: Koa.Middleware = async (ctx) => {
  const routerContext: StaticRouterContext & { statusCode?: number } = {}
  const helmetContext = {}

  const reactBody = renderStylesToString(
    renderToString(
      <StaticRouter location={ctx.request.originalUrl} context={routerContext}>
        <HelmetProvider context={helmetContext}>
          <App />
        </HelmetProvider>
      </StaticRouter>,
    ),
  )

  if (routerContext.statusCode) {
    ctx.status = routerContext.statusCode
  }
  if (routerContext.url) {
    ctx.redirect(routerContext.url)
    return
  }

  ctx.body = template(reactBody, (helmetContext as FilledContext).helmet)
}

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8030)

appLogger.info(`Booting server on ${getPort()} 👢`)

const server = createKoaServer({
  publicPath: '/assets',
  assetLocation: __dirname + '/assets',
})

server.router.use(setRequestUuidMiddleware)
server.router.use(setLoggerMiddleware)
server.router.use(logRequestMiddleware)

routes.forEach((route) => {
  server.router.get(route.path, getPageMiddleware)
})

server.app.listen(getPort(), () => {
  appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
})
