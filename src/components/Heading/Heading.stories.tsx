import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { fontSizes } from 'utils/storybook'
import { Heading } from './Heading'

export default {
  title: 'Components/Heading',
  component: Heading,
  decorators: [withKnobs],
  parameters: {
    paddings: [
      { name: 'Medium', value: '16px' },
      { name: 'Medium', value: '32px', default: true },
    ],
  },
}

export const Default = () => (
  <>
    <Heading as="h1" size="xl">
      Hedvig Forever
    </Heading>
    <Heading as="h2" size="lg">
      Hedvig Forever
    </Heading>
    <Heading as="h3" size="md">
      Hedvig Forever
    </Heading>
    <Heading as="h4" size="sm">
      Hedvig Forever
    </Heading>
    <Heading as="h4" size="xs">
      Hedvig Forever
    </Heading>
    <Heading as="h4" size="xxs">
      Hedvig Forever
    </Heading>
  </>
)

export const Withknobs = () => (
  <>
    <Heading
      as="h2"
      size={select('Font size', fontSizes, 'lg')}
      mobileSize={select('Font size mobile', fontSizes, 'sm')}
      textPosition={select(
        'Text position',
        ['left', 'center', 'right'],
        'left',
      )}
      useDisplayFont={boolean('Use display font', false)}
      capitalize={boolean('Capitalize', false)}
    >
      Hedvig Forever
    </Heading>
  </>
)
