import { mount } from 'enzyme'
import * as React from 'react'
import { App } from './App'

test('renders without 💥', () => {
  const wrapper = mount(<App />)

  expect(wrapper.find('div')).toHaveLength(1)
})
