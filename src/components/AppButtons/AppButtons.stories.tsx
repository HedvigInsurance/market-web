import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { AppButtons } from './AppButtons'

export default {
  title: 'Components/AppButtons',
  component: AppButtons,
  decorators: [],
  parameters: {
    paddings: [
      { name: 'Medium', value: '32px', default: true },
      { name: 'Large', value: '64px' },
    ],
  },
}

export const Standard = () => <AppButtons color="standard" />

export const StandardInverse = () => <AppButtons color="standard-inverse" />

const lightBackground = {
  parameters: {
    backgrounds: [{ name: 'gray100', value: colorsV3.gray100, default: true }],
  },
}

const darkBackground = {
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

Standard.story = lightBackground
StandardInverse.story = darkBackground
