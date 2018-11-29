declare module 'sitemap' {
  export type Changefreq =
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  export interface Url {
    url: string
    changefreq: Changefreq
    priority: number
  }
  export interface CreateSitemapOptions {
    hostname: string
    cacheTime: number
    urls: ReadonlyArray<Url>
  }

  export interface Sitemap {
    toString: () => string
    toXML: (callback?: (err: Error | void, xml: string) => void) => void
  }

  export const createSitemap: (options: CreateSitemapOptions) => Sitemap
}
