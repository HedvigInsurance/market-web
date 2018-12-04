import * as React from 'react'
import { BlogPage } from './pages/BlogPage'
import { StoryPage } from './pages/StoryPage'

export interface Route {
  path: string
  Component: React.ComponentType<{ nonce?: string }>
  exact: boolean
}

export const routes: Route[] = [
  { path: '/blog/*', exact: false, Component: BlogPage },
  { path: '/*', exact: false, Component: StoryPage },
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
