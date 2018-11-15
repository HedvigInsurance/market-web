import { IHelmetConfiguration } from 'helmet'
import * as uuidV4 from 'uuid/v4'

const defaultSrc = [
  "'self'",
  'cdn.hedvig.com',
  'app.storyblok.com',
  'www.googletagmanager.com',
  'https://*.hotjar.com',
  'wss://*.hotjar.com',
  'https://*.intercom.io',
  'https://*.intercomcdn.com',
  'https://*.intercomassets.com',
  'https://*.intercomusercontent.com',
  'wss://*.intercom.io',
  'wss://*.intercomcdn.com',
  'wss://*.intercomassets.com',
  'wss://*.intercomusercontent.com',
  'app.getsentry.com',
  'www.google-analytics.com',
  '*.facebook.net',
  '*.facebook.com',
  '*.doubleclick.net',
]

export const helmetConfig = (): IHelmetConfiguration => ({
  contentSecurityPolicy: {
    directives: {
      defaultSrc,
      scriptSrc: [
        ...defaultSrc,
        "'unsafe-eval'",
        'browser.sentry-cdn.com',
        'cdn.segment.com',
        'www.googletagmanager.com',
        // tslint:disable-next-line variable-name
        (_request: unknown, response: any) => {
          response.cspNonce = uuidV4()
          return `'nonce-${(response as any).cspNonce}'`
        },
      ],
      connectSrc: [
        ...defaultSrc,
        'https://api.segment.io',
        'https://sentry.io',
      ],
      styleSrc: [...defaultSrc, "'unsafe-inline'"],
      upgradeInsecureRequests: true,
      objectSrc: ["'none'"],
      reportUri: process.env.CSP_REPORT_ENDPOINT || '/_report-csp-violation',
    },
  },
  frameguard: { action: 'allow-from', domain: 'https://app.storyblok.com' },
})
