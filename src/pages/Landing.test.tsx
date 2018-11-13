import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Landing } from './Landing'

test('renders without 💥', () => {
  const wrapper = mount(
    <Provider initialState={{ story: { story: { name: 'blargh' } } }}>
      <HelmetProvider>
        <Landing />
      </HelmetProvider>
    </Provider>,
  )

  expect(wrapper.find('div')).toHaveLength(1)
})
