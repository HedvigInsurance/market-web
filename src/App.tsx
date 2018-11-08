import * as React from 'react'
import styled from 'react-emotion'
import { hot } from 'react-hot-loader'

const AppComponent = styled('div')({
  backgroundColor: 'pink',
  color: 'red',
})

export const App: React.SFC = () => <AppComponent>Hello world!</AppComponent>

export const HotApp = hot(module)(App)
