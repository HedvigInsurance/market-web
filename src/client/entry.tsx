import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { HotApp } from '../App'

ReactDOM.hydrate(
  <BrowserRouter>
    <HelmetProvider>
      <HotApp />
    </HelmetProvider>
  </BrowserRouter>,
  document.getElementById('react-root'),
)
