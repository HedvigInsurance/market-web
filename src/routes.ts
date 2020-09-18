import React from 'react'
import { PageFork } from './pages/PageFork'

export interface Route {
  path: string
  Component: React.ComponentType<{ nonce?: string }>
  exact: boolean
  ignoreStoryblokMiss?: boolean
}

export const routes: Route[] = [
  { path: '/*', exact: false, Component: PageFork, ignoreStoryblokMiss: true },
]
