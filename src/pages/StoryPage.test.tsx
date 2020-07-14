import { Provider } from 'constate'
import { mount } from 'enzyme'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { v4 as uuidV4 } from 'uuid'
import { StoryPage } from './StoryPage'

test('renders without 💥', () => {
  mount(
    <Provider
      initialState={{
        story: {
          story: {
            uuid: uuidV4(),
            name: 'blargh',
            full_slug: '/home',
            content: { _uid: uuidV4(), body: [] },
          },
        },
      }}
    >
      <BrowserRouter>
        <HelmetProvider>
          <StoryPage />
        </HelmetProvider>
      </BrowserRouter>
    </Provider>,
  )
})
