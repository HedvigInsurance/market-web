import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api.storyblok.com',
})

export const getPublishedStoryFromSlug = (path: string) =>
  apiClient.get(`/v1/cdn/stories${path}`, {
    params: {
      token: process.env.STORYBLOK_API_TOKEN,
      find_by: 'slug',
    },
    headers: {
      'cache-control': 'no-cache',
    },
  })

export const getDraftedStoryById = (id: string, contentVersion: string) =>
  apiClient.get(`/v1/cdn/stories/${id}`, {
    params: {
      token: process.env.STORYBLOK_API_TOKEN,
      find_by: 'id',
      version: 'draft',
      cv: contentVersion,
    },
    headers: {
      'cache-control': 'no-cache',
    },
  })
