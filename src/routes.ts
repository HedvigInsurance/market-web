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
  ['/press', '/about-us', 301],
  ['/terms', '/villkor', 301],
  ['/student', '/hemforsakring/student', 301],
  [
    '/uploads/press-2018-09-19.pdf',
    '/f/50672/x/6eb539f57f/press-2018-09-19.pdf',
    301,
  ],
  ['/blog/tags/meet-the-team', '/blog/tags/meet%20the%20team', 301],
  [
    '/blog/2018-11-16-meet-the-team-%E2%80%93-sofia',
    '/blog/2018-11-16-meet-the-team-sofia',
    301,
  ],
  [
    '/blog/2018-10-12-hedvig-och-qasa-g%C3%B6r-det-enklare-och-tryggare-att-hyra-ut-din-bostad',
    '/blog/2018-10-12-hedvig-och-qasa-gor-det-enklare-och-tryggare-att-hyra-ut-din-bostad',
    301,
  ],
  [
    '/assets/press/hedvig-press-assets.zip',
    'https://cdn.hedvig.com/identity/hedvig-press-assets.zip',
    301,
  ],
]
