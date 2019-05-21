const Koa = require('koa') // tslint:disable-line
const moxios = require('moxios') // tslint:disable-line
const supertest = require('supertest') // tslint:disable-line

import { parseString } from 'xml2js'
import { SitemapXml, sitemapXml } from './sitemap'

const linksResponse = `
{
    "links": {
        "d22f981e-47d7-485c-bdb5-ec38f6c950bc": {
            "id": 440720,
            "slug": "blog",
            "name": "blog",
            "is_folder": true,
            "parent_id": 0,
            "published": false,
            "position": -199795,
            "uuid": "d22f981e-47d7-485c-bdb5-ec38f6c950bc",
            "is_startpage": false
        },
        "73ea775c-679c-4cea-8e3e-e7bb22cac75d": {
            "id": 423642,
            "slug": "developers",
            "name": "Developers",
            "is_folder": false,
            "parent_id": 0,
            "published": false,
            "position": -197275,
            "uuid": "73ea775c-679c-4cea-8e3e-e7bb22cac75d",
            "is_startpage": false
        },
        "5ffb3365-2172-4d1b-84b0-eb2a68ffa2ce": {
            "id": 419566,
            "slug": "global",
            "name": "Global",
            "is_folder": true,
            "parent_id": 0,
            "published": false,
            "position": -195965,
            "uuid": "5ffb3365-2172-4d1b-84b0-eb2a68ffa2ce",
            "is_startpage": false
        },
        "06c44005-1ed9-4384-872b-ca69b14eebd8": {
            "id": 440756,
            "slug": "blog/hello-world-26",
            "name": "Hello world 26",
            "is_folder": false,
            "parent_id": 440720,
            "published": true,
            "position": -250,
            "uuid": "06c44005-1ed9-4384-872b-ca69b14eebd8",
            "is_startpage": false
        }
    }
}
`

beforeEach(() => {
  moxios.install()
})
afterEach(() => {
  moxios.uninstall()
})

test('it stitches together a correct sitemap', () => {
  const app = new Koa()
  app.use(sitemapXml)

  moxios.stubRequest(/^https:\/\/api\.storyblok\.com\/v1\/cdn\/links/, {
    status: 200,
    responseText: linksResponse,
  })

  const server = app.listen()
  const request = supertest(server)

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
        { changefreq: 'daily', loc: '/blog/hello-world-26', priority: '0.7' },
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
