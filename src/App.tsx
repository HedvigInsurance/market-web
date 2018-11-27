import * as React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch } from 'react-router-dom'
import { GlobalStyles } from './components/GlobalStyles'
import { routes } from './routes'

export const App: React.FunctionComponent<{ nonce?: string }> = ({ nonce }) => (
  <>
    <GlobalStyles />
    <Switch>
      {routes.map(({ Component, exact, path }) => (
        <Route
          key={path}
          exact={exact}
          path={path}
          render={(props) => <Component {...props} nonce={nonce} />}
        />
      ))}
    </Switch>
  </>
)

export const HotApp = hot(module)(App)
