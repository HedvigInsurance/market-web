const webpack = require('webpack')
const path = require('path')
const { StatsWriterPlugin } = require('webpack-stats-plugin')
const webpackConfig = require('./webpack.config.base')

const root = path.resolve(__dirname, '..')

const whiteListedEnvVars = [
  'PORT',
  'STORYBLOK_API_TOKEN',
  'PUBLIC_HOST',
  'FORCE_HOST',
  'REDIS_URL',
  'USE_AUTH',
  'AUTH_NAME',
  'AUTH_PASS',
  'USE_HELMET',
  'CSP_REPORT_ENDPOINT',
  'SENTRY_DSN',
  'SENTRY_ENVIRONMENT',
  'DATADOG_APPLICATION_ID',
  'DATADOG_CLIENT_TOKEN',
  'SEGMENT_API_KEY',
  'BRANCH_API_KEY',
  'HEROKU_SLUG_COMMIT',
  'HEROKU_DYNO_ID',
  'GIRAFFE_ENDPOINT',
]

module.exports = webpackConfig({
  entry: {
    server: [path.resolve(root, 'src/server/entry.tsx')],
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  mode: process.env.NODE_ENV || 'development',
  context: root,
  output: {
    filename: '[name].js',
    path: path.resolve(root, 'build'),
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      ...whiteListedEnvVars.reduce(
        (acc, curr) => ({
          ...acc,
          [`process.env.${curr}`]: `process.env.${curr}`,
        }),
        {},
      ),
    }),
  ],
})
