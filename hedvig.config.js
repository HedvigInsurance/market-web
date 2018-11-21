const path = require('path')

module.exports = {
  clientEntry: path.resolve(__dirname, 'src/client/entry.tsx'),
  serverEntry: path.resolve(__dirname, 'src/server/entry.tsx'),
  context: __dirname, // Where webpack should work
  clientPath: path.resolve(__dirname, 'build/assets/'), // Build asset path
  serverPath: path.resolve(__dirname, 'build/'), // Build asset path
  port: 8031, // The WDS port
  developmentPublicPath: 'http://0.0.0.0:8031/', // Client public path during development, i.e. "http://0.0.0.0:8081/". Port must match the port directive
  productionPublicPath: '/assets-next/', //  Client public path in production, i.e. "/assets/"
  envVars: [
    'STORYBLOK_API_TOKEN',
    'HOST',
    'USE_AUTH',
    'AUTH_NAME',
    'AUTH_PASS',
    'USE_HELMET',
    'CSP_REPORT_ENDPOINT',
    'SENTRY_DSN',
    'SENTRY_ENVIRONMENT',
    'HEROKU_SLUG_COMMIT',
    'HEROKU_DYNO_ID',
  ], // Array of environment variables to pass through webpack. I.e. ['FOO', 'BAR']
}
