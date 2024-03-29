import { Global } from '@emotion/core'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader'
import { useLocation, Route, Switch } from 'react-router-dom'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { globalStyles } from './components/GlobalStyles'
import { routes } from './routes'
import { useGTMTracking } from './utils/tracking/gtm'

const getStoryblokApiToken = (): string => {
  if (
    typeof window === 'undefined' &&
    typeof process !== 'undefined' &&
    process.env.STORYBLOK_API_TOKEN
  ) {
    return process.env.STORYBLOK_API_TOKEN
  }

  return (window as any).STORYBLOK_API_TOKEN
}

storyblokInit({
  accessToken: getStoryblokApiToken(),
  use: [apiPlugin],
  apiOptions: {
    cache: { clear: 'auto', type: 'memory' },
  },
})

export const App: React.FunctionComponent<{ nonce?: string }> = ({ nonce }) => {
  const location = useLocation()
  useGTMTracking()
  useEffect(() => {
    // tslint:disable-next-line no-console
    console.log(
      `%cHey there fellow developer! Curious how we built this? Find us at https://github.com/HedvigInsurance !\nLike it, and want to change the insurance industry? Of course we're hiring: https://www.hedvig.com/se-en/jobs`,
      `font-size: 2rem; font-family: sans-serif; color: ${colorsV3.gray500}; padding: 2rem; display: block;`,
    )

    if (location.search.includes('xmas')) {
      // @ts-ignore
      import('magic-snowflakes')
        .then((m) => m.default)
        .then((Snowflakes) => Snowflakes())
    }
  }, [location.search])

  return (
    <>
      <Global styles={globalStyles} />
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
}

export const HotApp = hot(module)(App)
