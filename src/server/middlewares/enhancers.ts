import { Middleware } from 'koa'
import * as uuidV4 from 'uuid/v4'
import { loggerFactory } from '../logging'

export const setRequestUuidMiddleware: Middleware = async (ctx, next) => {
  ctx.state.requestUuid = ctx.get('x-request-id') || uuidV4()

  await next()
}

export const setLoggerMiddleware: Middleware = async (ctx, next) => {
  ctx.state.getLogger = (name: string) =>
    loggerFactory.getLogger(
      `requestUuid="${ctx.state.requestUuid}"${name ? `:${name}` : ''}`,
    )

  await next()
}

export const logRequestMiddleware: Middleware = async (ctx, next) => {
  const log = (e?: Error & { status?: number }) =>
    ctx.state
      .getLogger('request')
      .info(
        `${ctx.get('x-forwarded-proto') || ctx.request.protocol} ${
          ctx.request.method
        } ${ctx.request.originalUrl} - ${
          e && e.status ? e.status : ctx.status
        }`,
      )

  try {
    await next()
    log()
  } catch (e) {
    ctx.state.getLogger('request').error('Uncaught error in request', e)
    log(e)
    throw e
  }
}
