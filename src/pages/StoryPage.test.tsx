import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { StoryPage } from './StoryPage'

test('renders without 💥', () => {
  mount(
    <Provider
      initialState={{
        story: {
          story: { name: 'blargh', full_slug: '/home', content: { body: [] } },
        },
      }}
    >
      <HelmetProvider>
        <StoryPage />
      </HelmetProvider>
    </Provider>,
  )
})
