import { select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { globalStoryMock } from 'utils/storybook'
import { locales } from 'l10n/locales'
import { fallbackLocale } from 'l10n/l10n-utils'
import { TypeOfContract } from './types'
import { Perils } from './'

export default {
  title: 'Components/Perils/Perils',
  component: Perils,
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
  'NO_HOUSE',
  'DK_HOME_CONTENT',
]

const localesArr = Object.values(locales)
const localeIsoCodes = localesArr.map((obj) => obj.iso)

export const Default = () => (
  <Perils
    localeIsoCode={select('Language', localeIsoCodes, fallbackLocale.iso)}
    insuranceType={select('Type of insurance', types, 'SE_HOUSE')}
    story={globalStoryMock}
  />
)
