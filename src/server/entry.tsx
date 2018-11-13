import * as dotenv from 'dotenv'
dotenv.config()

import 'source-map-support/register'

import { createKoaServer } from '@hedviginsurance/web-survival-kit'
import { routes } from '../routes'
import { appLogger } from './logging'
import {
  logRequestMiddleware,
  setLoggerMiddleware,
  setRequestUuidMiddleware,
} from './middlewares/enhancers'
import { getPageMiddleware } from './page'

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
