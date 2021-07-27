import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'constate'
import { HelmetProvider } from 'react-helmet-async'
import { v4 as uuidV4 } from 'uuid'
import { BrowserRouter } from 'react-router-dom'

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

const AllTheProviders: FC = ({ children }) => {
  return (
    <Provider initialState={initialState}>
      <BrowserRouter>
        <HelmetProvider>{children}</HelmetProvider>
      </BrowserRouter>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as renderComponent }
