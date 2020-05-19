import axios, { AxiosRequestConfig } from 'axios'
import { IMiddleware } from 'koa-router'
import {
  BlogStory,
  BodyStory,
  GlobalStory,
  Story,
} from '../../storyblok/StoryContainer'
import { config } from '../config'
import { appLogger } from '../logging'
import { State } from '../middlewares/states'
import { redisClient } from './redis'

const calculateCacheVersionTimestamp = (date: Date) =>
  String(Math.round(Number(date) / 1000))

const apiClient = () =>
  axios.create({
    baseURL: 'https://api.storyblok.com',
  })

export const nukeCache: IMiddleware<State> = async (ctx) => {
  const keys = await redisClient.keys('storyblok:*')
  ctx.status = 204

  if (keys.length === 0) {
    appLogger.info('Tried to nuke cache but no keys found, skipping')
    return
  }

  appLogger.warn(`Nuking cache for ${keys.length} pages`)
  await redisClient.del(...keys)
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
  const uri = encodeURI(`/v1/cdn/stories/${locale}/global`)
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

export const getLangFromPath = (path: string) => {
  switch (true) {
    case /^\/se($|\/.*)/.test(path):
      return 'se'
    case /^\/se-en($|\/.*)/.test(path):
      return 'se-en'
    case /^\/no($|\/.*)/.test(path):
      return 'no'
    case /^\/no-en($|\/.*)/.test(path):
      return 'no-en'
    case /^\/en($|\/.*)/.test(path):
      return 'en'
    case /^\/sv($|\/.*)/.test(path):
      return 'sv'
    default:
      return null
  }
}

const sanitizeStorySlug = (story: Story) => {
  story.full_slug = story.full_slug.replace(/^sv(\/|$)/, '$1')
}

export const getPublishedStoryFromSlug = async (
  path: string,
  bypassCache?: boolean,
): Promise<{ story: BodyStory }> => {
  const lang = getLangFromPath(path)
  const realSlug = (lang === null ? '/sv' : '') + path
  const uri = encodeURI(`/v1/cdn/stories${realSlug}`)
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

  const component =
    result.data && result.data.story && result.data.story.content.component
  const isPublic =
    result.data && result.data.story && result.data.story.content.public

  if (
    (component === 'page' && !isPublic) ||
    path === '/sv' ||
    path.startsWith('/sv/')
  ) {
    const err: any = new Error()
    err.response = { status: 404 }
    throw err
  }

  if (result.data && result.data.story) {
    sanitizeStorySlug(result.data.story)
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
  _uid: string
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
