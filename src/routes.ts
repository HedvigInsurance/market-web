import { Landing } from './pages/Landnig'

export interface Route {
  path: string
  Component: React.ComponentType
  exact: boolean
}

export const routes: ReadonlyArray<Route> = [
  { path: '/', exact: true, Component: Landing },
]
