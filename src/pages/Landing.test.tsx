import { mount } from 'enzyme'
import * as React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Landing } from './Landing'

test('renders without 💥', () => {
  const wrapper = mount(
    <HelmetProvider>
      <Landing />
    </HelmetProvider>,
  )

  expect(wrapper.find('div')).toHaveLength(1)
})
