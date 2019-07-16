import { colors, fonts, getCdnFontFaces } from '@hedviginsurance/brand'
import * as React from 'react'
import { injectGlobal } from 'react-emotion'

export const GlobalStyles: React.FunctionComponent = () => {
  // tslint:disable-next-line no-unused-expression
  injectGlobal`
${getCdnFontFaces()}

* {
  box-sizing: border-box;
}

body {
  font-family: ${fonts.CIRCULAR}, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  padding: 0;
  color: ${colors.OFF_BLACK};
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${fonts.GEOMANIST}, sans-serif;
  font-kerning: none;
  margin: 1.414rem 0 0.5rem;
  font-weight: inherit;
  line-height: 1.0;
}

h1 {
  margin-top: 0;
  font-size: 5rem;
  font-weight: 900;
}
h2 {
  font-size: 3.5rem;
  font-weight: 600;
}
h3 {
  font-size: 2.5rem;
}
h4 {
  font-size: 1.25rem;
}

@media (max-width: 800px) {
  h1 {
    font-size: 3rem;
  }
  h2 {
      font-size: 2.25rem;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
      font-size: 2rem;
  }
}

a {
  color: inherit;
  &:hover, &:focus {
    color: inherit;
  }
}

img {
  max-width: 100%;
}
  
input, button {
  font-size: inherit;
}
`

  return null
}
