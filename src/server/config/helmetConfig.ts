import { IHelmetConfiguration } from 'helmet'
import * as uuid from 'uuid'

const defaultSrc = [
  "'self'",
  'hedvig.com',
  'www.hedvig.com',
  'cdn.hedvig.com',
  'https://*.storyblok.com',
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
  'www.googleadservices.com',
  'www.google.com',
  'www.google.se',
  'www.google.no',
  'www.google.fr',
  'www.gstatic.com',
  'www.googletagmanager.com',
  'tpc.googlesyndication.com',
  'd33wubrfki0l68.cloudfront.net',
  'tr.snapchat.com',
  'sc-static.net',
  '*.facebook.net',
  '*.facebook.com',
  '*.doubleclick.net',
  'sc-static.net',
  '*.branch.io',
  'bnc.lt',
  'www.studentkortet.se',
  'app.link',
  'hedvig.app.link',
  '*.ravenjs.com',
  'analytics.twitter.com',
  'online.adservicemedia.dk',
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
          response.cspNonce = uuid.v4()
          return `'nonce-${(response as any).cspNonce}'`
        },
      ],
      connectSrc: [
        ...defaultSrc,
        'https://api.segment.io',
        'https://sentry.io',
      ],
      imgSrc: [...defaultSrc, 'res.cloudinary.com'],
      styleSrc: [...defaultSrc, "'unsafe-inline'"],
      upgradeInsecureRequests: true,
      objectSrc: ["'self'"],
      reportUri: process.env.CSP_REPORT_ENDPOINT || '/_report-csp-violation',
    },
  },
  frameguard: { action: 'allow-from', domain: 'https://app.storyblok.com' },
})
