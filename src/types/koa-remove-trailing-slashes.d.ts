declare module 'koa-remove-trailing-slashes' {
  import { Middleware } from 'koa'

  interface RemoveTrailingSlashesArgs {
    defer?: boolean
    chained?: boolean
  }
  const removeTrailingSlashes: (args: RemoveTrailingSlashesArgs) => Middleware

  export = removeTrailingSlashes
}
