import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { Provider } from 'constate'
import { globalStoryMock, minimalColorMap } from 'utils/storybook'
import { fallbackLocale } from 'l10n/l10n-utils'
import { Footer } from './FooterBlock'

export default {
  title: 'Blocks/FooterBlock',
  component: Footer,
  decorators: [withKnobs],
}

const footerBaseProps = {
  _uid: '1234',
  component: 'footer',
  color: minimalColorMap['standard-inverse'],
}

export const Defualt = () => (
  <Provider initialState={{ context: { currentLocale: fallbackLocale } }}>
    <Footer story={globalStoryMock} {...footerBaseProps} />
  </Provider>
)
