import '@babel/polyfill'
import 'source-map-support/register'

import * as Sentry from '@sentry/node'
import Koa, { Middleware } from 'koa'
import auth from 'koa-basic-auth'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import proxy from 'koa-proxy'
import removeTrailingSlashes from 'koa-remove-trailing-slashes'
import Router from 'koa-router'
import { configureAssets } from 'server/middlewares/assets'
import { Logger } from 'typescript-logging'
import { redirects, routes } from '../routes'
import { config } from './config'
import { sentryConfig } from './config/sentry'
import { appLogger } from './logging'
import {
  inCaseOfEmergency,
  logRequestMiddleware,
  savePartnershipCookie,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './middlewares/enhancers'
import { forceHost, startPageRedirect } from './middlewares/redirects'
import {
  addBlogPostsToState,
  addTagBlogPostsToState,
  addTeamtailorUsersToState,
  State,
} from './middlewares/states'
import { getPageMiddleware } from './page'
import { sitemapXml } from './sitemap'
import { nukeCache } from './utils/storyblok'
import {
  getCachedTeamtailorUsers,
  initializeTeamtailorUsers,
} from './utils/teamtailor'

Sentry.init({
  ...sentryConfig(),
  serverName: process.env.HEROKU_DYNO_ID,
  attachStacktrace: true,
})

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8030)

appLogger.info(`Booting server on ${getPort()} 👢`)
appLogger.info(
  `Sentry is ${
    Boolean(sentryConfig().enabled) ? 'enabled' : 'disabled'
  }, with environment "${sentryConfig().environment}"`,
)

if (!config.storyblokApiToken) {
  appLogger.fatal('No api token for storyblok provided!')
  process.nextTick(() => process.exit(1))
}

const app = new Koa()
app.proxy = true
const router = new Router()

app.use(setRequestUuidMiddleware)
app.use(setLoggerMiddleware)
app.use(logRequestMiddleware)
app.use(compress({ threshold: 5 * 1024 }))

configureAssets(app)

if (process.env.USE_AUTH) {
  appLogger.info(
    `Protecting server using basic auth with user ${process.env.AUTH_NAME} 💂‍`,
  )
  app.use(
    auth({
      name: process.env.AUTH_NAME!,
      pass: process.env.AUTH_PASS!,
    }),
  )
} else {
  appLogger.info('Not using any auth, server is open to the public')
}

if (config.forceHost) {
  router.use('/*', forceHost({ host: config.forceHost }))
}
router.get('/', startPageRedirect)
router.use('/*', savePartnershipCookie)
router.use('/*', removeTrailingSlashes<State>())
router.get('/:locale(se|se-en|no|no-en)/referrals/:code', async (ctx) => {
  ctx.status = 301
  ctx.redirect(`/${ctx.params.locale}/forever/${ctx.params.code}`)
})
redirects.forEach(([source, target, code]) => {
  router.get(source, (ctx) => {
    ctx.status = code
    ctx.redirect(target)
  })
})
app.use(
  proxy({
    host: 'https://a.storyblok.com',
    match: /^\/f\//,
  }),
)
router.use(
  '/*',
  bodyParser({
    extendTypes: { json: ['application/csp-report'] },
  }) as Middleware<State, any>,
)

app.use(inCaseOfEmergency)
router.use(inCaseOfEmergency)

router.get('/panic-room', async () => {
  throw new Error(
    'Entered the panic room, this is an expected error. Carry on 👜',
  )
})

router.post('/_report-csp-violation', (ctx) => {
  ;(ctx.state.getLogger('cspViolation') as Logger).error(
    `CSP VIOLATION: ${JSON.stringify((ctx.request as any).body)}`,
  )
  ctx.status = 204
})

router.get('/sitemap.xml', sitemapXml)
router.use('/blog', addBlogPostsToState)
router.use('/blog', addTeamtailorUsersToState)
router.use('/about-us', addTeamtailorUsersToState)
router.use('/en/about-us', addTeamtailorUsersToState)
router.use('/blog/tags/:tag', addTagBlogPostsToState)
routes.forEach((route) => {
  router.get(route.path, getPageMiddleware(Boolean(route.ignoreStoryblokMiss)))
})
router.post('/_nuke-cache', nukeCache)

app.use(router.middleware())

getCachedTeamtailorUsers()
  .then(async (users) => {
    if (users.length === 0) {
      appLogger.info(
        'No teamtailor users found in cache, waiting for initialization to complete before starting server',
      )
      return initializeTeamtailorUsers() // wait for promise to complete before continuing
    } else {
      appLogger.info(
        'Teamtailor users found in cache, starting server while refreshing cache',
      )
      initializeTeamtailorUsers() // ignore promise since we want to start even if we're timing out TT users
      return users
    }
  })
  .catch(() => {
    appLogger.error('Failed to fetch teamtailor users, ignoring')
  })
  .then(() => {
    app.listen(getPort(), () => {
      appLogger.info(`Server started 🚀 listening on port ${getPort()}`)
    })
  })
