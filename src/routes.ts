import * as React from 'react'
import { StoryPage } from './pages/StoryPage'

export interface Route {
  path: string
  Component: React.ComponentType
  exact: boolean
}

export const routes: Route[] = [
  { path: '/*', exact: false, Component: StoryPage },
]

export const tmpOldRoutes: string[] = [
  '/*.js',
  '/static/*',
  '/assets/*',
  '/uploads/*',
  '/favicons/*',
  '/*.html',

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
