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

const perilProps = brfPerils[1]

export const Default = () => (
  <div style={{ maxWidth: '290px' }}>
    <PerilItem
      title={perilProps.title}
      description={perilProps.description}
      icon={perilProps.icon}
      onClick={action('clicked')}
    />
  </div>
)
