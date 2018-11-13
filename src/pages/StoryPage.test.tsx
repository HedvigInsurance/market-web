import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { StoryPage } from './StoryPage'

test('renders without 💥', () => {
  const wrapper = mount(
    <Provider initialState={{ story: { story: { name: 'blargh' } } }}>
      <HelmetProvider>
        <StoryPage />
      </HelmetProvider>
    </Provider>,
  )

  expect(wrapper.find('div')).toHaveLength(1)
})
