import * as React from 'react'
import { StoryPage } from './pages/StoryPage'

export interface Route {
  path: string
  Component: React.ComponentType
  exact: boolean
}

export const routes: ReadonlyArray<Route> = [
  { path: '/*', exact: false, Component: StoryPage },
]
