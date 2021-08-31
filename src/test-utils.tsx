import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'constate'
import { HelmetProvider } from 'react-helmet-async'
import { v4 as uuidV4 } from 'uuid'
import { BrowserRouter } from 'react-router-dom'
import { locales } from 'utils/locales'
import { LocaleProvider } from './context/LocaleContext'

const initialState = {
  story: {
    story: {
      uuid: uuidV4(),
      name: 'blargh',
      full_slug: '/home',
      content: { _uid: uuidV4(), body: [] },
    },
  },
}

const AllTheProviders: React.FC = ({ children }) => {
  return (
    <Provider initialState={initialState}>
      <LocaleProvider currentLocale={locales['se-en']}>
        <BrowserRouter>
          <HelmetProvider>{children}</HelmetProvider>
        </BrowserRouter>
      </LocaleProvider>
    </Provider>
  )
}

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as renderComponent }
