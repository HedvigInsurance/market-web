import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { ButtonBrandPivot } from './Button'

export default {
  title: 'Components/Button',
  component: ButtonBrandPivot,
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
    <ButtonBrandPivot color="standard">Some text</ButtonBrandPivot>
    <br />
    <br />
    <ButtonBrandPivot color="standard" styleType="outlined">
      Some text
    </ButtonBrandPivot>
    <br />
    <br />
    <ButtonBrandPivot color="standard" styleType="plain">
      Some text
    </ButtonBrandPivot>
  </>
)

export const StandardInverse = () => (
  <>
    <ButtonBrandPivot color="standard-inverse">Some text</ButtonBrandPivot>
    <br />
    <br />
    <ButtonBrandPivot color="standard-inverse" styleType="outlined">
      Some text
    </ButtonBrandPivot>
    <br />
    <br />
    <ButtonBrandPivot color="standard-inverse" styleType="plain">
      Some text
    </ButtonBrandPivot>
  </>
)

export const Purple = () => (
  <>
    <ButtonBrandPivot color="purple500">Some text</ButtonBrandPivot>
    <br />
    <br />
    <ButtonBrandPivot color="purple500" styleType="outlined">
      Some text
    </ButtonBrandPivot>
    <br />
    <br />
    <ButtonBrandPivot color="purple500" styleType="plain">
      Some text
    </ButtonBrandPivot>
  </>
)

const darkBackground = {
  parameters: {
    backgrounds: [{ name: 'gray900', value: colorsV3.gray900, default: true }],
  },
}

StandardInverse.story = darkBackground
Purple.story = darkBackground
