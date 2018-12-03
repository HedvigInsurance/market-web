import * as React from 'react'
import { BlogPostsPage } from './pages/BlogPostsPage'
import { BlogPostsTagPage } from './pages/BlogPostsTagPage'
import { PageFork } from './pages/PageFork'

export interface Route {
  path: string
  Component: React.ComponentType<{ nonce?: string }>
  exact: boolean
  ignoreStoryblokMiss?: boolean
}

export const routes: Route[] = [
  {
    path: '/blog/tags/:tag',
    exact: true,
    Component: BlogPostsTagPage,
    ignoreStoryblokMiss: true,
  },
  {
    path: '/blog',
    exact: true,
    Component: BlogPostsPage,
    ignoreStoryblokMiss: true,
  },
  { path: '/*', exact: false, Component: PageFork },
]

export const oldAssetRoutes: string[] = [
  '/*.js',
  '/static/*',
  '/assets/*',
  '/uploads/*',
  '/favicons/*',
  '/*.html',
]

export const tmpOldRoutes: string[] = [
  '/',
  '/student',
  '/giving-back',
  '/faq',
  '/about-us',
  '/contact',
  '/legal',
  '/privacy',
  '/blog*',

  '/en',
  '/en/student',
  '/en/giving-back',
  '/en/faq',
  '/en/about-us',
  '/en/contact',
  '/en/legal',
  '/en/privacy',
]

export const redirects: ReadonlyArray<[string, string, number]> = [
  [
    '/assets/press/hedvig-press-assets.zip',
    'https://cdn.hedvig.com/identity/hedvig-press-assets.zip',
    301,
  ],
]
