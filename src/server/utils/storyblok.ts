import axios from 'axios'
import { config } from '../config'

const apiClient = axios.create({
  baseURL: 'https://api.storyblok.com',
})

export const getPublishedStoryFromSlug = (path: string) =>
  apiClient.get(`/v1/cdn/stories${path === '/' ? '/home' : path}`, {
    params: {
      token: config.storyblokApiToken,
      find_by: 'slug',
    },
    headers: {
      'cache-control': 'no-cache',
    },
  })

export const getDraftedStoryById = (id: string, contentVersion: string) =>
  apiClient.get(`/v1/cdn/stories/${id}`, {
    params: {
      token: config.storyblokApiToken,
      find_by: 'id',
      version: 'draft',
      cv: contentVersion,
    },
    headers: {
      'cache-control': 'no-cache',
    },
  })

export const getStoryblokEditorScript = () =>
  `<script
      src="//app.storyblok.com/f/storyblok-latest.js?t=${
        config.storyblokApiToken
      }"
      type="text/javascript"></script>
    <script>
      storyblok.on(['published', 'change'], function() {
        location.reload(true)
      })

      storyblok.pingEditor(function() {
        if (storyblok.inEditor) {
          storyblok.enterEditmode()
        }
      })
    </script>`
