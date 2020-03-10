import { configure } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { themeDecorator } from './decorators/themeDecorator'

const req = require.context('../src', true, /\.stories\.tsx$/)
function loadStories() {
  req.keys().forEach(req)
}
configure(loadStories, module)

addDecorator(themeDecorator)
