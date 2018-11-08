import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import { GlobalStyles } from './components/GlobalStyles'
import { routes } from './routes'

export const App: React.SFC = () => (
  <>
    <GlobalStyles />
    <Switch>
      {routes.map(({ Component, exact, path }) => (
        <Route key={path} component={Component} exact={exact} path={path} />
      ))}
    </Switch>
  </>
)

export const HotApp = hot(module)(App)
