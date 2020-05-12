import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
// import StoryRouter from 'storybook-react-router'
import { globalStoryMock, minimalColorMap } from 'utils/storybook'
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
  <Footer story={globalStoryMock} {...footerBaseProps} />
)
