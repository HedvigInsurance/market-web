import axios, { AxiosResponse } from 'axios'
import { BodyStory, GlobalStory } from '../../storyblok/StoryContainer'
import { config } from '../config'
import { appLogger } from '../logging'

let remoteCacheVersion = new Date()
const getRemoteCacheVersionTimestamp = () =>
  String(Math.round(Number(remoteCacheVersion) / 1000))
setTimeout(() => {
  appLogger.info('Updating remote cache version')
  remoteCacheVersion = new Date()
}, 60 * 15 * 1000)

const apiClient = axios.create({
  baseURL: 'https://api.storyblok.com',
})

export const getGlobalStory = async (
  cacheVersion?: string,
): Promise<AxiosResponse<GlobalStory> | undefined> => {
  try {
    return await apiClient.get<GlobalStory>(`/v1/cdn/stories/global`, {
      params: {
        token: config.storyblokApiToken,
        find_by: 'slug',
        cv: cacheVersion || getRemoteCacheVersionTimestamp(),
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
  cacheVersion?: string,
) =>
  apiClient.get<BodyStory>(`/v1/cdn/stories${path === '/' ? '/home' : path}`, {
    params: {
      token: config.storyblokApiToken,
      find_by: 'slug',
      cv: cacheVersion || getRemoteCacheVersionTimestamp(),
    },
  })

export const getDraftedStoryById = (id: string, cacheVersion: string) =>
  apiClient.get<BodyStory>(`/v1/cdn/stories/${id}`, {
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
