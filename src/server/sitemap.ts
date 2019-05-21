import { Middleware } from 'koa'
import { Changefreq, createSitemap } from 'sitemap'
import { promisify } from 'util'
import { getAllStoryblokLinks } from './utils/storyblok'

export interface SitemapXml {
  urlset: {
    url: ReadonlyArray<{
      loc: [string]
      changefreq: [Changefreq]
      priority: [string]
    }>
  }
}

const getSitemapLinks = async () => {
  const nextLinks = await getAllStoryblokLinks()
  return Object.keys(nextLinks.data.links)
    .filter(
      (key) =>
        nextLinks.data.links[key].published &&
        !nextLinks.data.links[key].is_folder &&
        !/^global\//.test(nextLinks.data.links[key].slug),
    )
    .map(
      (key) => '/' + nextLinks.data.links[key].slug.replace(/(^|\/)home$/, ''),
    )
    .map((url) => ({
      url,
      priority: 0.7,
      changefreq: 'daily' as Changefreq,
    }))
    .filter(({ url }) => Boolean(url))
}

export const sitemapXml: Middleware = async (ctx) => {
  const sitemapCreator = createSitemap({
    hostname: process.env.PUBLIC_HOST || '',
    cacheTime: 60 * 10 * 1000,
    urls: await getSitemapLinks(),
  })
  // Something breaks if we pass `undefined` as a first argument but promisify requires us to do it = just ignore this
  // @ts-ignore
  const sitemap = await promisify(sitemapCreator.toXML.bind(sitemapCreator))()
  ctx.type = 'xml'
  ctx.body = sitemap
}
