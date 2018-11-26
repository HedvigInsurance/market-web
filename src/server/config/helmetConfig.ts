import { IHelmetConfiguration } from 'helmet'
// import * as uuidV4 from 'uuid/v4'

const defaultSrc = [
  "'self'",
  'cdn.hedvig.com',
  'https://*.storyblok.com',
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
  'www.googleadservices.com',
  'www.google.com',
  'www.google.se',
  'd33wubrfki0l68.cloudfront.net',
  'tr.snapchat.com',
  'sc-static.net',
  '*.facebook.net',
  '*.facebook.com',
  '*.doubleclick.net',
  'sc-static.net',
  '*.branch.io',
  'app.link',
  '*.ravenjs.com',
  'analytics.twitter.com',
]

export const helmetConfig = (): IHelmetConfiguration => ({
  contentSecurityPolicy: {
    directives: {
      defaultSrc,
      scriptSrc: [
        ...defaultSrc,
        "'unsafe-inline'", // TODO remove this when old site is dead 💀
        "'unsafe-eval'",
        'browser.sentry-cdn.com',
        'cdn.segment.com',
        'www.googletagmanager.com',
        // TODO activate nonce when old site is dead
        // tslint:disable-next-line variable-name
        // (_request: unknown, response: any) => {
        //   response.cspNonce = uuidV4()
        //   return `'nonce-${(response as any).cspNonce}'`
        // },
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
