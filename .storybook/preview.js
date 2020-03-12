import { addDecorator } from '@storybook/react'
import { withPaddings } from 'storybook-addon-paddings'
import { themeDecorator } from './decorators/themeDecorator'

// Add global decorators (added to all stories)
addDecorator(withPaddings)
addDecorator(themeDecorator)
