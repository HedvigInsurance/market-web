import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { Button } from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  decorators: [],
  parameters: {
    paddings: [
      { name: 'Medium', value: '32px', default: true },
      { name: 'Large', value: '64px' },
    ],
  },
}

export const Standard = () => (
  <>
    <Button color="standard">Some text</Button>
    <br />
    <br />
    <Button color="standard" styleType="outlined">
      Some text
    </Button>
    <br />
    <br />
    <Button color="standard" styleType="plain">
      Some text
    </Button>
  </>
)

export const StandardInverse = () => (
  <>
    <Button color="standard-inverse">Some text</Button>
    <br />
    <br />
    <Button color="standard-inverse" styleType="outlined">
      Some text
    </Button>
    <br />
    <br />
    <Button color="standard-inverse" styleType="plain">
      Some text
    </Button>
  </>
)

export const Purple = () => (
  <>
    <Button color="purple500">Some text</Button>
    <br />
    <br />
    <Button color="purple500" styleType="outlined">
      Some text
    </Button>
    <br />
    <br />
    <Button color="purple500" styleType="plain">
      Some text
    </Button>
  </>
)

const darkBackground = {
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

StandardInverse.story = darkBackground
Purple.story = darkBackground
