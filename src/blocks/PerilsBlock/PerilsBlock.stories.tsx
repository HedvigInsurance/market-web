import { select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { ContractOption, PerilsBlock } from './PerilsBlock'

export default {
  title: 'Blocks/PerilsBlock',
  component: PerilsBlock,
  decorators: [withKnobs],
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px', default: true },
      { name: 'Medium', value: '32px' },
    ],
  },
}

const options: ContractOption[] = [
  { value: 'SE_APARTMENT_BRF', label: 'Bostadsrätt' },
  { value: 'SE_APARTMENT_RENT', label: 'Hyresrätt' },
  { value: 'SE_HOUSE', label: 'Hus & Villa' },
  { value: 'SE_APARTMENT_STUDENT_BRF', label: 'Student' },
]

export const Default = () => (
  <PerilsBlock
    _uid="1234"
    component="perils_block"
    insurance_types={options}
    color={
      minimalColorMap[
        select('Color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    size={select('Size', ['none', 'sm', 'lg', 'xl'], 'sm')}
  />
)
