import { fonts, getCdnFontFaces } from '@hedviginsurance/brand'
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
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${fonts.SORAY}, sans-serif;
  font-kerning: none;
<<<<<<< HEAD
  margin: 1.414rem 0 0.5rem;
  font-weight: inherit;
  line-height: 1.2;
=======
  margin: 0;
  padding: 0;
>>>>>>> Add ImageTextSection block
}

p {
  margin-bottom: 1.3rem;
}

h1 {
  margin-top: 0;
  font-size: 3.998rem;
}
h2 {
  font-size: 2.827rem;
}
h3 {
  font-size: 1.999rem;
}
h4 {
  font-size: 1.414rem;
}


img {
  max-width: 100%;
}

.Container {
  margin-left: auto;
  margin-right: auto;
  max-width: 1240px;
  padding-left: 20px;
  padding-right: 20px;
}

.Container::before,
.Container::after {
  content: " ";
  display: table;
}

.Container::after {
  clear: both;
}

.Container--withoutGutter {
  padding-left: 0;
  padding-right: 0;
}

`

  return null
}
