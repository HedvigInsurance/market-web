import React from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from '../../src/components/GlobalStyles'

export const themeDecorator = (story) => (
  <>
    <Global styles={globalStyles} />
    {story()}
  </>
)
