import { addDecorator } from '@storybook/react'
import { addParameters } from '@storybook/react'
import { withPaddings } from 'storybook-addon-paddings'
import { themeDecorator } from './decorators/themeDecorator'

// Add global decorators (added to all stories)
addDecorator(withPaddings)
addDecorator(themeDecorator)

const customViewports = {
  mobile1: {
    name: 'Small mobile',
    styles: {
      height: '568px',
      width: '320px',
    },
    type: 'mobile',
  },
  mobile2: {
    name: 'Medium mobile',
    styles: {
      height: '667px',
      width: '375px',
    },
    type: 'mobile',
  },
  mobile3: {
    name: 'Large mobile',
    styles: {
      height: '896px',
      width: '414px',
    },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet',
    styles: {
      height: '1112px',
      width: '834px',
    },
    type: 'tablet',
  },
  laptop1: {
    name: 'Laptop 13',
    styles: {
      height: '800px',
      width: '1280px',
    },
  },
  laptop2: {
    name: 'Laptop 15',
    styles: {
      height: '900px',
      width: '1440px',
    },
  },
}

addParameters({
  viewport: {
    viewports: {
      ...customViewports,
    },
  },
})
