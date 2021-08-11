import React from 'react'
import { renderComponent } from '../test-utils'
import { StoryPage } from './StoryPage'

test('renders without 💥', () => {
  renderComponent(<StoryPage />)
})
