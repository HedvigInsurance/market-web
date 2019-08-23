import * as Sentry from '@sentry/node'
import * as https from 'https'
import { Context, Middleware } from 'koa'
import { Logger } from 'typescript-logging'

const handleSuperFatalError = (ctx: Context) => (superFatalError: Error) => {
  ;(ctx.state.getLogger('emergency') as Logger).fatal(
    'SUPER-FATAL ERROR! Uncaught error in request, but failed to get error page. Throwing error again to trigger super-fatal error page',
    superFatalError,
  )
  Sentry.captureException(superFatalError)
  return superFatalError
}

export const inCaseOfEmergency: Middleware = async (ctx, next) => {
  try {
    await nextWithSentry(ctx, next)
  } catch (e) {
    if (e.status) {
      throw e
    }
    ctx.status = 500
    try {
      ;(ctx.state.getLogger('emergency') as Logger).error(
        'Uncaught error in request, requesting 500 page',
        e,
      )
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

export const nextWithSentry: Middleware = async (ctx, next) => {
  const sentry = new Sentry.Hub(
    Sentry.getCurrentHub().getClient(),
    new Sentry.Scope(),
  )
  sentry.configureScope((scope) => {
    scope.setExtra('requestUuid', ctx.state.requestUuid)
  })
  try {
    await next()
  } catch (e) {
    sentry.captureException(e)
    throw e
  }
}

export const savePartnershipCookie: Middleware = async (ctx, next) => {
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
