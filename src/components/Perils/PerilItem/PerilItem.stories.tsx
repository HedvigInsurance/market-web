import { action } from '@storybook/addon-actions'
import React from 'react'
import { brfPerils } from '../perilMockData/brf'
import { PerilItem } from './PerilItem'

export default {
  title: 'Components/Perils/PerilItem',
  component: PerilItem,
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px', default: true },
      { name: 'Medium', value: '32px' },
    ],
  },
}

const peril = brfPerils[0].items[0]

export const Default = () => (
  <div style={{ maxWidth: '184px', margin: 'auto' }}>
    <PerilItem
      title={peril.title}
      color="standard"
      icon={peril.icon}
      onClick={action('click')}
    />
  </div>
)
