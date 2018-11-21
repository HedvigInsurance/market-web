import { Provider } from 'constate'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from '../App'

ReactDOM.hydrate(
  <Provider initialState={{ ...(window as any).__INITIAL_STATE__ }}>
    <BrowserRouter>
      <HelmetProvider>
        <HotApp />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('react-root'),
)
