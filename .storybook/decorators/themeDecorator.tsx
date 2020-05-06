import React from 'react'
import { Global } from '@emotion/core'
import { globalStylesStorybook } from '../../src/components/GlobalStyles'

export const themeDecorator = (story) => (
  <>
    <Global styles={globalStylesStorybook} />
    {story()}
  </>
)
