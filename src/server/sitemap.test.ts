jest.mock('./utils/redis', () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn(),
  },
}))

import Koa from 'koa'
import moxios from 'moxios'
import supertest from 'supertest'
import { parseString } from 'xml2js'
import { appLogger } from './logging'
import { SitemapXml, sitemapXml } from './sitemap'
import {
  indexedStoryResponse,
  linksResponse,
  noindexedStoryResponse,
} from './sitemap-test-data'
import { apiClient } from './utils/storyblok'
import { redisClient } from './utils/redis'

beforeEach(() => {
  moxios.install(apiClient)
})
afterEach(() => {
  moxios.uninstall(apiClient)
})

test('it stitches together a correct sitemap with cache miss', () => {
  const app = new Koa()
  app.use((ctx, next) => {
    ctx.state.getLogger = () => appLogger
    return next()
  })
  app.use(sitemapXml)

  moxios.stubRequest(/^\/v2\/cdn\/links/, {
    status: 200,
    responseText: linksResponse,
  })
  moxios.stubRequest(/^\/v2\/cdn\/stories\/se-en\/hello-world-26/, {
    status: 200,
    responseText: indexedStoryResponse,
  })
  moxios.stubRequest(/^\/v2\/cdn\/stories\/se-en\/hello-world-27/, {
    status: 200,
    responseText: noindexedStoryResponse,
  })

  const server = app.listen()
  const request = supertest(server)
  const redisGetterMockInstance = (redisClient.get as any) as jest.MockInstance<
    Promise<string | null>,
    [string]
  >
  redisGetterMockInstance.mockReturnValue(Promise.resolve(null))

  return request
    .get('/sitemap.xml')
    .expect(200)
    .then(
      ({ text }: { text: string }) =>
        new Promise<SitemapXml>((resolve, reject) => {
          parseString(text, (err, result) => {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        }),
    )
    .then((response: SitemapXml) => {
      const partialExpectedResponse = [
        { changefreq: 'daily', loc: '/se-en/hello-world-26' },
      ]

      expect(
        response.urlset.url.map((u) => ({
          loc: u.loc[0],
          changefreq: u.changefreq[0],
        })),
      ).toEqual(partialExpectedResponse)
    })
    .finally(() => {
      server.close()
    })
})

test('it stitches together a correct sitemap with cache hit', () => {
  const app = new Koa()
  app.use((ctx, next) => {
    ctx.state.getLogger = () => appLogger
    return next()
  })
  app.use(sitemapXml)

  const server = app.listen()
  const request = supertest(server)
  const redisGetterMockInstance = (redisClient.get as any) as jest.MockInstance<
    Promise<string | null>,
    [string]
  >
  const cachedSitemap = [
    {
      url: 'blah',
      changefreq: 'daily',
    },
  ]
  redisGetterMockInstance.mockReturnValue(
    Promise.resolve(JSON.stringify(cachedSitemap)),
  )

  return request
    .get('/sitemap.xml')
    .expect(200)
    .then(
      ({ text }: { text: string }) =>
        new Promise<SitemapXml>((resolve, reject) => {
          parseString(text, (err, result) => {
            if (err) {
              reject(err)
              return
            }
            resolve(result)
          })
        }),
    )
    .then((response: SitemapXml) => {
      expect(
        response.urlset.url.map((u) => ({
          loc: u.loc[0],
          changefreq: u.changefreq[0],
        })),
      ).toEqual([
        {
          loc: 'blah',
          changefreq: 'daily',
        },
      ])
    })
    .finally(() => {
      server.close()
    })
})
