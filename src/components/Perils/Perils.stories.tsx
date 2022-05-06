import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { globalStoryMock } from 'utils/storybook'
import { mockPerils } from './perilMockData/multiplePromises'
import { brfPerils } from './perilMockData/brf'
import { Perils } from '.'

export default {
  title: 'Components/Perils/Perils',
  component: Perils,
  decorators: [withKnobs],
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px' },
      { name: 'Medium', value: '32px', default: true },
    ],
    layout: 'centered',
  },
}

export const Default = () => (
  <div style={{ maxWidth: '800px', margin: 'auto' }}>
    <Perils perilsCollections={brfPerils} story={globalStoryMock} />
  </div>
)

export const MultiplePromises = () => (
  <div style={{ maxWidth: '800px', margin: 'auto' }}>
    <Perils perilsCollections={mockPerils} story={globalStoryMock} />
  </div>
)
