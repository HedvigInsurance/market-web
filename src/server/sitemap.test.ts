import { appLogger } from './logging'

const Koa = require('koa') // tslint:disable-line
const moxios = require('moxios') // tslint:disable-line
const supertest = require('supertest') // tslint:disable-line

jest.mock('./utils/redis', () => ({
  redisClient: {
    get: jest.fn(),
    set: jest.fn(),
  },
}))

import { parseString } from 'xml2js'
import { SitemapXml, sitemapXml } from './sitemap'
import {
  indexedStoryResponse,
  linksResponse,
  noindexedStoryResponse,
} from './sitemap-test-data'
import { redisClient } from './utils/redis'

beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

test('it stitches together a correct sitemap with cache miss', () => {
  const app = new Koa()
  app.use((ctx, next) => {
    ctx.state.getLogger = () => appLogger
    return next()
  })
  app.use(sitemapXml)

  moxios.stubRequest(/^https:\/\/api\.storyblok\.com\/v1\/cdn\/links/, {
    status: 200,
    responseText: linksResponse,
  })
  moxios.stubRequest(
    /^https:\/\/api\.storyblok\.com\/v1\/cdn\/stories\/se-en\/hello-world-26/,
    {
      status: 200,
      responseText: indexedStoryResponse,
    },
  )
  moxios.stubRequest(
    /^https:\/\/api\.storyblok\.com\/v1\/cdn\/stories\/se-en\/hello-world-27/,
    {
      status: 200,
      responseText: noindexedStoryResponse,
    },
  )

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
        new Promise((resolve, reject) => {
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
        { changefreq: 'daily', loc: '/se-en/hello-world-26', priority: '0.7' },
      ]

      expect(
        response.urlset.url.map((u) => ({
          loc: u.loc[0],
          changefreq: u.changefreq[0],
          priority: u.priority[0],
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
      priority: 0.7,
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
        new Promise((resolve, reject) => {
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
          priority: u.priority[0],
        })),
      ).toEqual([
        {
          loc: 'blah',
          changefreq: 'daily',
          priority: '0.7',
        },
      ])
    })
    .finally(() => {
      server.close()
    })
})
