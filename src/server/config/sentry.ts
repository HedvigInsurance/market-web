const sentryDsn = process.env.SENTRY_DSN
const sentryEnvironment = process.env.SENTRY_ENVIRONMENT || 'dev'

export const sentryConfig = () => ({
  dsn: sentryDsn,
  enabled: Boolean(sentryDsn),
  environment: sentryEnvironment,
  release: process.env.HEROKU_SLUG_COMMIT,
})
