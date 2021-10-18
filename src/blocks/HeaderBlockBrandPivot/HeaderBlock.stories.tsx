import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import StoryRouter from 'storybook-react-router'
import { Provider } from 'constate'
import { globalStoryMock, link, minimalColorMap } from 'utils/storybook'
import { fallbackLocale } from 'utils/locales'
import { HeroBlock } from '../HeroBlock/HeroBlock'
import { Header } from '.'

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
  <Provider initialState={{ context: { currentLocale: fallbackLocale } }}>
    <div>
      <Header
        {...headerBaseProps}
        story={globalStoryMock}
        hide_menu={boolean('Hide menu', false)}
        is_transparent={boolean('Is Transparent', true)}
        inverse_colors={boolean(
          'Inverse Colors (transparent header only)',
          true,
        )}
        cta_color={
          minimalColorMap[
            select(
              'CTA color',
              Object.keys(minimalColorMap),
              'standard-inverse',
            )
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
  </Provider>
)

export const WithHero = () => (
  <Provider initialState={{ context: { currentLocale: fallbackLocale } }}>
    <div>
      <Header
        {...headerBaseProps}
        story={globalStoryMock}
        is_transparent={boolean('Is Transparent', true)}
        inverse_colors={boolean(
          'Inverse Colors (transparent header only)',
          true,
        )}
        cta_color={
          minimalColorMap[
            select(
              'CTA color',
              Object.keys(minimalColorMap),
              'standard-inverse',
            )
          ]
        }
        cta_style={select(
          'CTA style',
          ['outlined', 'filled', 'plain'],
          'outlined',
        )}
      />
      <HeroBlock
        _uid="1234"
        component="hero"
        color={minimalColorMap['standard-inverse']}
        headline="Hjälp så som du aldrig kunnat <br/>föreställa dig den"
        headline_font_size="md"
        image="https://res.cloudinary.com/gustaveen-com/image/upload/q_40/v1589550685/hus_villa_z07bvi.jpg"
        image_mobile=""
        hide_bg_tint={false}
        show_cta={true}
        cta_label="Läs mer"
        cta_style="outlined"
        cta_color={minimalColorMap['standard-inverse']}
        cta_link={link}
      />
      <ScrollContainer />
    </div>
  </Provider>
)

export const WithHeroAndBanner = () => (
  <Provider initialState={{ context: { currentLocale: fallbackLocale } }}>
    <div>
      <Header
        {...headerBaseProps}
        story={{
          ...globalStoryMock,
          content: { ...globalStoryMock.content, show_banner: true },
        }}
        is_transparent={boolean('Is Transparent', true)}
        inverse_colors={boolean(
          'Inverse Colors (transparent header only)',
          true,
        )}
        cta_color={
          minimalColorMap[
            select(
              'CTA color',
              Object.keys(minimalColorMap),
              'standard-inverse',
            )
          ]
        }
        cta_style={select(
          'CTA style',
          ['outlined', 'filled', 'plain'],
          'outlined',
        )}
      />
      <HeroBlock
        _uid="1234"
        component="hero"
        color={minimalColorMap['standard-inverse']}
        headline="Hjälp så som du aldrig kunnat <br/>föreställa dig den"
        headline_font_size="md"
        image="https://res.cloudinary.com/gustaveen-com/image/upload/q_40/v1589550685/hus_villa_z07bvi.jpg"
        image_mobile=""
        hide_bg_tint={false}
        show_cta={true}
        cta_label="Läs mer"
        cta_style="outlined"
        cta_color={minimalColorMap['standard-inverse']}
        cta_link={link}
      />
      <ScrollContainer />
    </div>
  </Provider>
)
