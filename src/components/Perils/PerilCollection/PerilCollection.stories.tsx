import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { brfPerils } from '../perilMockData/brf'
import { PerilCollection } from './PerilCollection'

export default {
  title: 'Components/Perils/PerilCollection',
  component: PerilCollection,
  decorators: [withKnobs],
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px', default: true },
      { name: 'Medium', value: '32px' },
    ],
  },
}
export const Default = () => <PerilCollection perils={brfPerils} />
