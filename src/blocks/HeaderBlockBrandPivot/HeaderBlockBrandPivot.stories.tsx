import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { globalStoryMock, minimalColorMap } from 'utils/storybook'
import { Header } from '.'

export default {
  title: 'Blocks/HeaderBlock',
  component: Header,
  decorators: [withKnobs],
}

const headerBaseProps = {
  _uid: '1234',
  component: 'header',
}

const ScrollContainer = styled('div')({
  height: '140vh',
})

export const Default = () => (
  <div>
    <Header
      {...headerBaseProps}
      story={globalStoryMock}
      is_transparent={boolean('Is Transparent', true)}
      inverse_colors={boolean('Inverse Colors (transparent header only)', true)}
      cta_color={
        minimalColorMap[
          select('CTA color', Object.keys(minimalColorMap), 'standard-inverse')
        ]
      }
      cta_style={select(
        'CTA style',
        ['outlined', 'filled', 'plain'],
        'outlined',
      )}
    />
    <ScrollContainer />
  </div>
)

Default.story = {
  parameters: {
    backgrounds: [
      { name: 'gray500', value: colorsV3.gray500, default: true },
      { name: 'gray900', value: colorsV3.gray900 },
      { name: 'white', value: colorsV3.white },
    ],
  },
}
