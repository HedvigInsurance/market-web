import axios, { AxiosRequestConfig } from 'axios'
import {
  BlogStory,
  BodyStory,
  GlobalStory,
} from '../../storyblok/StoryContainer'
import { config } from '../config'
import { appLogger } from '../logging'
import { redisClient } from './redis'

const calculateCacheVersionTimestamp = (date: Date) =>
  String(Math.round(Number(date) / 1000))

const apiClient = () =>
  axios.create({
    baseURL: 'https://api.storyblok.com',
  })

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
    const response = await apiClient().get<T>(...axiosParams)
    const result = { status: response.status, data: response.data }
    await redisClient.set(
      `storyblok:${cacheKey}`,
      JSON.stringify(result),
      'EX',
      60 * 10,
    )
    return result
  } catch (e) {
    if (e.response && e.response.status && e.response.status === 404) {
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
  const uri = encodeURI(`/v1/cdn/stories/${locale ? locale + '/' : ''}global`)
  const result = await cachedGet<{ story: GlobalStory }>(
    uri,
    [
      uri,
      {
        params: {
          token: config.storyblokApiToken,
          find_by: 'slug',
          cv: calculateCacheVersionTimestamp(new Date()),
        },
      },
    ],
    bypassCache,
  )
  return result && result.data && result.data
}

const getLangFromPath = (path: string) => {
  switch (true) {
    case /^\/en/.test(path):
      return 'en'
    default:
      return 'default'
  }
}
export const getPublishedStoryFromSlug = async (
  path: string,
  bypassCache?: boolean,
): Promise<{ story: BodyStory }> => {
  const uri = encodeURI(
    `/v1/cdn/stories${path.replace(/^(\/en|^\/)?$/, '$1/home')}`,
  )
  const result = await cachedGet<{ story: BodyStory }>(
    uri,
    [
      uri,
      {
        params: {
          token: config.storyblokApiToken,
          find_by: 'slug',
          cv: calculateCacheVersionTimestamp(new Date()),
        },
      },
    ],
    bypassCache,
  )

  const lang =
    (result.data && result.data.story && result.data.story.lang) || ''
  const component =
    result.data && result.data.story && result.data.story.content.component
  const isPublic =
    result.data && result.data.story && result.data.story.content.public

  if (getLangFromPath(path) !== lang || (component === 'page' && !isPublic)) {
    const err: any = new Error()
    err.response = { status: 404 }
    throw err
  }

  return result.data
}
export const getDraftedStoryById = (id: string, cacheVersion: string) =>
  apiClient()
    .get<{ story: BodyStory }>(encodeURI(`/v1/cdn/stories/${id}`), {
      params: {
        token: config.storyblokApiToken,
        find_by: 'slug',
        version: 'draft',
        cv: cacheVersion || calculateCacheVersionTimestamp(new Date()),
      },
      headers: {
        'cache-control': 'no-cache',
      },
    })
    .then(({ data }) => data)

export const getBlogPosts = (bypassCache: boolean, tag?: string) => {
  const cacheKey = `/v1/cdn/stories?filter_query[component][in]=blog&with_tag=${tag}`
  return cachedGet<{ stories: ReadonlyArray<BlogStory> }>(
    cacheKey,
    [
      '/v1/cdn/stories',
      {
        params: {
          token: config.storyblokApiToken,
          'filter_query[component][in]': 'blog',
          with_tag: tag,
          sort_by: 'first_published_at:desc',
          cv: calculateCacheVersionTimestamp(new Date()),
        },
      },
    ],
    bypassCache,
  )
}

export interface Link {
  id: number
  slug: string
  name: string
  is_folder: boolean
  parent_id: number
  published: boolean
  position: number
  uuid: string
  is_startpage: boolean
}
export interface LinkResult {
  links: { [uuid: string]: Link }
}
export const getAllStoryblokLinks = () =>
  apiClient().get<LinkResult>('/v1/cdn/links', {
    params: {
      token: config.storyblokApiToken,
      cv: calculateCacheVersionTimestamp(new Date()),
    },
  })

export const getStoryblokEditorScript = (nonce: string) =>
  `<script
      src="//app.storyblok.com/f/storyblok-latest.js?t=${
        config.storyblokApiToken
      }"
      type="text/javascript"></script>
    <script nonce="${nonce}">
      storyblok.on(['published', 'change'], function() {
        location.reload(true)
      })

      storyblok.pingEditor(function() {
        if (storyblok.inEditor) {
          storyblok.enterEditmode()
        }
      })
    </script>`
