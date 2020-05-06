import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import StoryRouter from 'storybook-react-router'
import { globalStoryMock, minimalColorMap } from 'utils/storybook'
import { Header } from '.'
import { Hero } from '../HeroImageBlockBrandPivot/HeroImageBlockBrandPivot'

export default {
  title: 'Blocks/HeaderBlock',
  component: Header,
  decorators: [withKnobs, StoryRouter()],
  parameters: {
    backgrounds: [
      { name: 'gray900', value: colorsV3.gray900, default: true },
      { name: 'gray100', value: colorsV3.gray100 },
    ],
  },
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

export const WithHero = () => (
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
    <Hero
      _uid="1234"
      component="hero"
      headline="Hjälp så som du aldrig kunnat föreställa dig den"
      headline_font_size="md"
      image="https://source.unsplash.com/user/heytowner/?orientation=landscape"
      image_mobile=""
      story={globalStoryMock}
    />
    <ScrollContainer />
  </div>
)
