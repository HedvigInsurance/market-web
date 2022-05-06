import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { brfPerils } from '../perilMockData/brf'
import { PerilList } from './PerilList'

export default {
  title: 'Components/Perils/PerilCollection',
  component: PerilList,
  decorators: [withKnobs],
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px', default: true },
      { name: 'Medium', value: '32px' },
    ],
  },
}

export const Default = () => (
  <PerilList
    color="standard"
    perils={brfPerils[0].items}
    setCurrentPeril={() => 1}
    setIsShowingPeril={() => true}
  />
)
