import React from 'react'
import { Global } from '@emotion/core'
import { globalStylesBrandPivot } from '../../src/components/GlobalStyles'

export const themeDecorator = (story) => (
  <>
    <Global styles={globalStylesBrandPivot} />
    {story()}
  </>
)
