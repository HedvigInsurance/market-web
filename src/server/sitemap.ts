import axios from 'axios'
import { Middleware } from 'koa'
import { Changefreq, createSitemap, Url } from 'sitemap'
import { promisify } from 'util'
import * as xml2js from 'xml2js'
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

const normaliseOldSitemapLink = (link: string) =>
  link.replace('https://www.hedvig.com', '').replace(/(.+)\/$/, '$1')
const getStichedSitemapLinks = async (): Promise<ReadonlyArray<Url>> => {
  const nextLinks = await getAllStoryblokLinks()
  const nextSitemapLinks = Object.keys(nextLinks.data.links)
    .filter(
      (key) =>
        nextLinks.data.links[key].published &&
        !nextLinks.data.links[key].is_folder &&
        !/^global\//.test(nextLinks.data.links[key].slug),
    )
    .map(
      (key) => '/' + nextLinks.data.links[key].slug.replace(/(^|\/)home$/, ''),
    )
  const oldLinksResponse = await axios.get<string>(
    'https://hedvig.netlify.com/sitemap.xml',
    {},
  )
  const oldLinksData = await promisify<
    string,
    xml2js.OptionsV2 | void,
    SitemapXml
  >(xml2js.parseString as any)(oldLinksResponse.data, undefined)
  const actualOldLinks = oldLinksData.urlset.url
    .filter(
      ({ loc }) => !nextSitemapLinks.includes(normaliseOldSitemapLink(loc[0])),
    )
    .map(({ loc, priority, changefreq }) => ({
      url: normaliseOldSitemapLink(loc[0]),
      changefreq: changefreq[0] as Changefreq,
      priority: parseFloat(priority[0]),
    }))

  return nextSitemapLinks
    .map((url) => ({
      url,
      priority: 0.7,
      changefreq: 'daily' as Changefreq,
    }))
    .concat(actualOldLinks)
    .filter(({ url }) => Boolean(url))
}

export const sitemapXml: Middleware = async (ctx) => {
  const sitemapCreator = createSitemap({
    hostname: process.env.PUBLIC_HOST || '',
    cacheTime: 60 * 10 * 1000,
    urls: await getStichedSitemapLinks(),
  })
  const sitemap = await promisify(sitemapCreator.toXML.bind(sitemapCreator))(
    undefined,
  )
  ctx.type = 'xml'
  ctx.body = sitemap
}
