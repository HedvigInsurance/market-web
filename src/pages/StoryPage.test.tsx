import { Provider } from 'constate'
import { mount } from 'enzyme'
import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import uuid from 'uuid'
import { StoryPage } from './StoryPage'

test('renders without 💥', () => {
  mount(
    <Provider
      initialState={{
        story: {
          story: {
            uuid: uuid.v4(),
            name: 'blargh',
            full_slug: '/home',
            content: { _uid: uuid.v4(), body: [] },
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
