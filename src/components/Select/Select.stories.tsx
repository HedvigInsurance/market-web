import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Select } from './Select'

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px', default: true },
      { name: 'Medium', value: '32px' },
    ],
  },
}

const options = [
  { value: 'bostadsrätt', label: 'Bostadsrätt' },
  { value: 'hyresrätt', label: 'Hyresrätt' },
  { value: 'hus_villa', label: 'Hus & Villa' },
  { value: 'student', label: 'Student' },
]

export const Default = () => (
  <div style={{ maxWidth: '160px' }}>
    <Select
      defaultValue={{ value: 'bostadsrätt', label: 'Bostadsrätt' }}
      options={options}
    />
  </div>
)

const darkBackground = {
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

Default.story = darkBackground
