import utm from '@segment/utm-params'
import { Provider } from 'constate'
import Cookies from 'js-cookie'
import React from 'react'
import { hydrate } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { LocaleProvider } from 'context/LocaleContext'
import { HotApp } from '../App'
import * as Datadog from './utils/datadog'

Datadog.initRum()

hydrate(
  <Provider initialState={{ ...(window as any).__INITIAL_STATE__ }}>
    <LocaleProvider currentLocale={{ ...(window as any).__CURRENT_LOCALE__ }}>
      <BrowserRouter>
        <HelmetProvider>
          <HotApp />
        </HelmetProvider>
      </BrowserRouter>
    </LocaleProvider>
  </Provider>,
  document.getElementById('react-root'),
)

window.addEventListener('load', () => {
  const searchParams = utm.strict(window.location.search)
  // 7 days is a standard attribution window for app installs
  const EXPIRY_DAYS = 7
  const existingParams = Cookies.getJSON('utm-params') || {}
  Object.keys(searchParams).forEach((key) => {
    existingParams[key] = searchParams[key]
  })
  Cookies.set('utm-params', existingParams, {
    expires: EXPIRY_DAYS,
    secure: window.location.protocol === 'https:',
  })
})
