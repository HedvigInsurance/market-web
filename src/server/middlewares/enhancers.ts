import https from 'https'
import { datadogRum } from '@datadog/browser-rum'
import { Middleware } from 'koa'
import { IMiddleware, RouterContext } from 'koa-router'
import { LFService } from 'typescript-logging'
import { v4 as uuidV4 } from 'uuid'
import { options } from '../logging'
import { State } from './states'

const handleSuperFatalError = (ctx: RouterContext<State>) => (
  superFatalError: Error,
) => {
  ctx.state
    .getLogger('emergency')
    .fatal(
      'SUPER-FATAL ERROR! Uncaught error in request, but failed to get error page. Throwing error again to trigger super-fatal error page',
      superFatalError,
    )
  datadogRum.addError(superFatalError)
  return superFatalError
}

export const inCaseOfEmergency: IMiddleware<State> = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    if (e.status) {
      throw e
    }
    ctx.status = 500
    try {
      ctx.state
        .getLogger('emergency')
        .error('Uncaught error in request, requesting 500 page', e)
      await new Promise((resolve, reject) => {
        https.get('https://cdn.hedvig.com/500.html', (errorPageResponse) => {
          ctx.set('content-type', 'text/html')
          errorPageResponse
            .pipe(ctx.res)
            .on('error', (superFatalError) => {
              reject(handleSuperFatalError(ctx)(superFatalError))
            })
            .on('end', resolve)
        })
      })
    } catch (superFatalError) {
      throw handleSuperFatalError(ctx)(superFatalError)
    }
  }
}

export const savePartnershipCookie: Middleware<any, any> = async (
  ctx,
  next,
) => {
  if (ctx.query.partner) {
    ctx.cookies.set('_hvpartner', ctx.query.partner.toLowerCase(), {
      httpOnly: false,
      path: '/',
      signed: false,
    })
  }

  if (ctx.query.code) {
    ctx.cookies.set('_hvcode', ctx.query.code.toLowerCase(), {
      httpOnly: false,
      path: '/',
      signed: false,
    })
  }

  await next()
}

export const loggerFactory = LFService.createLoggerFactory(options)

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
  const log = (e?: { status: any }) =>
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
