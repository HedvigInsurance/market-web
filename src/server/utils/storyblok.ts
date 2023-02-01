import axios, { AxiosRequestConfig } from 'axios'
import { IMiddleware } from 'koa-router'
import { warmSitemapCache } from 'server/sitemap'
import {
  BodyStory,
  GlobalStory,
  DatasourceEntry,
} from '../../storyblok/StoryContainer'
import { config } from '../config'
import { appLogger } from '../logging'
import { State } from '../middlewares/states'
import { redisClient } from './redis'

const calculateCacheVersionTimestamp = (date: Date) =>
  String(Math.round(Number(date) / 1000))

export const apiClient = axios.create({ baseURL: 'https://api.storyblok.com' })

export const nukeCache: IMiddleware<State> = async (ctx) => {
  const keys = await redisClient.keys('storyblok:*')
  ctx.status = 204

  appLogger.warn(`Nuking cache for ${keys.length} pages`)
  await redisClient.del(...keys, 'hvg:sitemap')
  warmSitemapCache(appLogger)
}

const cachedGet = async <T>(
  cacheKey: string,
  axiosParams: [string, AxiosRequestConfig | undefined],
  bypassCache?: boolean,
): Promise<{ status: number; data: T }> => {
  if (!bypassCache) {
    const cached = await redisClient.get(`storyblok:${cacheKey}`)
    if (cached) {
      const result = JSON.parse(cached)
      appLogger.info(`Cache hit [key="${cacheKey}", status=${result.status}]`)
      return result
    }
  }

  appLogger.info(`Cache miss [key="${cacheKey}"]`)
  try {
    const response = await apiClient.get<T>(...axiosParams)
    const result = { status: response.status, data: response.data }
    await redisClient.set(
      `storyblok:${cacheKey}`,
      JSON.stringify(result),
      'EX',
      60 * 10,
    )
    return result
  } catch (e) {
    if (e?.response?.status === 404) {
      const result = { status: e.response.status, data: e.response.data }
      await redisClient.set(
        `storyblok:${cacheKey}`,
        JSON.stringify(result),
        'EX',
        60 * 10,
      )
      return result
    }

    throw e
  }
}

export const getGlobalStory = async (
  locale: string,
  bypassCache?: boolean,
): Promise<{ story: GlobalStory } | undefined> => {
  const uri = encodeURI(`/v1/cdn/stories/${locale}/global`)
  const axiosParams = {
    params: {
      token: config.storyblokApiToken,
      find_by: 'slug',
      cv: calculateCacheVersionTimestamp(new Date()),
    },
  }
  const result = await cachedGet<{ story: GlobalStory }>(
    uri,
    [uri, axiosParams],
    bypassCache,
  )

  return result?.data
}

export const getPublishedStoryFromSlug = async (
  path: string,
  bypassCache?: boolean,
): Promise<{ story: BodyStory }> => {
  const uri = encodeURI(`/v1/cdn/stories${path}`)
  const result = await cachedGet<{ story: BodyStory }>(
    uri,
    [
      uri,
      {
        params: {
          token: config.storyblokApiToken,
          find_by: 'slug',
          cv: calculateCacheVersionTimestamp(new Date()),
          resolve_relations: 'article.categories',
        },
      },
    ],
    bypassCache,
  )

  return result.data
}

export const getDraftedStoryById = (id: string, cacheVersion: string) =>
  apiClient
    .get<{ story: BodyStory }>(encodeURI(`/v1/cdn/stories/${id}`), {
      params: {
        token: config.storyblokApiToken,
        find_by: 'slug',
        version: 'draft',
        cv: cacheVersion || calculateCacheVersionTimestamp(new Date()),
        resolve_relations: 'article.categories',
      },
      headers: {
        'cache-control': 'no-cache',
      },
    })
    .then(({ data }) => data)

export const getDatasourceEntries = async (
  datasource: string,
  bypassCache?: boolean,
) => {
  const uri = encodeURI(`/v1/cdn/datasource_entries?datasource=${datasource}`)
  const result = await cachedGet<{
    datasource_entries: DatasourceEntry[]
  }>(
    uri,
    [
      uri,
      {
        params: {
          token: config.storyblokApiToken,
          per_page: 1000,
          cv: calculateCacheVersionTimestamp(new Date()),
        },
      },
    ],
    bypassCache,
  )
  return result.data
}

export interface Link {
  id: number
  slug: string
  name: string
  is_folder: boolean
  parent_id: number
  published: boolean
  position: number
  _uid: string
  is_startpage: boolean
}
export interface LinkResult {
  links: { [uuid: string]: Link }
}
export const getAllStoryblokLinks = () =>
  apiClient.get<LinkResult>('/v1/cdn/links', {
    params: {
      token: config.storyblokApiToken,
      cv: calculateCacheVersionTimestamp(new Date()),
    },
  })

export const getStoryblokEditorScript = (nonce: string) =>
  `<script
      src="//app.storyblok.com/f/storyblok-latest.js?t=${config.storyblokApiToken}"
      type="text/javascript"></script>
    <script nonce="${nonce}">
      storyblok.on(['published', 'change'], function() {
        if (window.updateStoryContainer) {
          fetch(
            window.location.pathname + window.location.search,
             { headers: { accept: 'application/json' } }
          )
            .then(r => r.json())
            .then(data => {
              window.updateStoryContainer(data)
            })
        } else {
          location.reload(true)
        }
      })

      storyblok.pingEditor(function() {
        if (storyblok.inEditor) {
          storyblok.enterEditmode()
        }
      })
    </script>`
