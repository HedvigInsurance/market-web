import { css } from '@emotion/core'
import { colorsV3, fonts, getCdnFontFaces } from '@hedviginsurance/brand'

export const globalStyles = css`
  ${getCdnFontFaces()}

  * {
    box-sizing: border-box;
  }

  body {
    font-family: ${fonts.FAVORIT}, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    color: ${colorsV3.gray900};
    background-color: ${colorsV3.gray100};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-kerning: none;
    margin: 1.414rem 0 0.5rem;
    font-weight: inherit;
    line-height: 1;
  }

  h1 {
    margin-top: 0;
    font-size: 5rem;
    font-weight: 400;
  }
  h2 {
    font-size: 3.5rem;
    font-weight: 400;
  }
  h3 {
    font-size: 2.5rem;
    font-weight: 400;
  }
  h4 {
    font-size: 1.25rem;
    font-weight: 400;
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
    &:hover,
    &:focus {
      color: inherit;
    }
  }

  img {
    max-width: 100%;
  }

  input,
  button {
    font-size: inherit;
  }
`
