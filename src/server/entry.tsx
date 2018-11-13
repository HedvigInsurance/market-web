import 'source-map-support/register'

import { createKoaServer } from '@hedviginsurance/web-survival-kit'
import { routes } from '../routes'
import { config } from './config'
import { appLogger } from './logging'
import {
  logRequestMiddleware,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './middlewares/enhancers'
import { getPageMiddleware } from './page'

const getPort = () => (process.env.PORT ? Number(process.env.PORT) : 8030)

appLogger.info(`Booting server on ${getPort()} 👢`)

if (!config.storyblokApiToken) {
  appLogger.fatal('No api token for storyblok provided!')
  process.nextTick(() => process.exit(1))
}

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
