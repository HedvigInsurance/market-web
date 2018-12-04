import axios, { AxiosResponse } from 'axios'
import {
  BlogStory,
  BodyStory,
  GlobalStory,
} from '../../storyblok/StoryContainer'
import { config } from '../config'
import { appLogger } from '../logging'

let remoteCacheVersion = new Date()
const calculateCacheVersionTimestamp = (date: Date) =>
  String(Math.round(Number(date) / 1000))
const getRemoteCacheVersionTimestamp = () =>
  calculateCacheVersionTimestamp(remoteCacheVersion)

if (process.env.NODE_ENV !== 'test') {
  setTimeout(() => {
    appLogger.info('Updating remote cache version')
    remoteCacheVersion = new Date()
  }, 60 * 15 * 1000)
}

const apiClient = () =>
  axios.create({
    baseURL: 'https://api.storyblok.com',
  })

export const getGlobalStory = async (
  bypassCache?: boolean,
): Promise<AxiosResponse<GlobalStory> | undefined> => {
  try {
    return await apiClient().get<GlobalStory>(`/v1/cdn/stories/global`, {
      params: {
        token: config.storyblokApiToken,
        find_by: 'slug',
        cv: bypassCache
          ? calculateCacheVersionTimestamp(new Date())
          : getRemoteCacheVersionTimestamp(),
      },
    })
  } catch (e) {
    if (e.response && e.response.status === 404) {
      return undefined
    }

    throw e
  }
}

export const getPublishedStoryFromSlug = (
  path: string,
  bypassCache?: boolean,
) =>
  apiClient().get<BodyStory>(
    `/v1/cdn/stories${path === '/' ? '/home' : path}`,
    {
      params: {
        token: config.storyblokApiToken,
        find_by: 'slug',
        cv: bypassCache
          ? calculateCacheVersionTimestamp(new Date())
          : getRemoteCacheVersionTimestamp(),
      },
    },
  )

export const getDraftedStoryById = (id: string, cacheVersion: string) =>
  apiClient().get<BodyStory>(`/v1/cdn/stories/${id}`, {
    params: {
      token: config.storyblokApiToken,
      find_by: 'id',
      version: 'draft',
      cv: cacheVersion || getRemoteCacheVersionTimestamp(),
    },
    headers: {
      'cache-control': 'no-cache',
    },
  })

export const getBlogPosts = (bypassCache: boolean, tag?: string) =>
  apiClient().get<{ stories: ReadonlyArray<BlogStory> }>(`/v1/cdn/stories`, {
    params: {
      token: config.storyblokApiToken,
      'filter_query[component][in]': 'blog',
      with_tag: tag,
      sort_by: 'first_published_at:desc',
      cv: bypassCache
        ? calculateCacheVersionTimestamp(new Date())
        : getRemoteCacheVersionTimestamp(),
    },
  })

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
      cv: getRemoteCacheVersionTimestamp(),
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
