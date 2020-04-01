import { select, withKnobs } from '@storybook/addon-knobs'
import { TypeOfContract } from 'components/Perils/types'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { PerilsBlock } from './PerilsBlock'

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

const types: TypeOfContract[] = [
  'SE_HOUSE',
  'SE_APARTMENT_BRF',
  'SE_APARTMENT_RENT',
  'SE_APARTMENT_STUDENT_BRF',
  'SE_APARTMENT_STUDENT_RENT',
  'NO_HOME_CONTENT_OWN',
  'NO_HOME_CONTENT_RENT',
  'NO_HOME_CONTENT_YOUTH_OWN',
  'NO_HOME_CONTENT_YOUTH_RENT',
  'NO_TRAVEL',
  'NO_TRAVEL_YOUTH',
]

export const Default = () => (
  <PerilsBlock
    _uid="1234"
    component="perils_block"
    insurance_type={select('Type of insurance', types, 'SE_HOUSE')}
    color={
      minimalColorMap[
        select('Color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    size={select('Size', ['none', 'sm', 'lg', 'xl'], 'sm')}
  />
)
