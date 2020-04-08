import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import { minimalColorComponentColors } from 'blocks/BaseBlockProps'
import { TextPosition } from 'utils/textPosition'
import { getMinimalColorStyles, TABLET_BP_UP } from '../blockHelpers'

export type FontSizes = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface HeadingProps {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  capitalize?: boolean
  color?: minimalColorComponentColors
  mobileSize?: FontSizes
  size: FontSizes
  textPosition?: TextPosition
  useDisplayFont?: boolean
}

export const headingSizeMapMobile = {
  xxs: '1rem', // 16px
  xs: '1.125rem', // 18px
  sm: '1.5rem', // 24px
  md: '2rem', // 32px
  lg: '2.5rem', // 40px
  xl: '3.5rem', // 56px
}
export const headingSizeMap = {
  xxs: '1.125rem', // 18px
  xs: '2rem', // 32px
  sm: '3rem', // 48px
  md: '3.5rem', // 56px
  lg: '4.5rem', // 72px
  xl: '6rem', // 96px
}

export const Heading = styled.h1<HeadingProps>`
  position: relative;
  margin: 0;
  color: ${(props) =>
    props.color ? getMinimalColorStyles(props.color).color : 'inherit'};
  font-size: ${(props) => headingSizeMapMobile[props.mobileSize ?? props.size]};
  text-align: ${(props) => props.textPosition};
  text-transform: ${(props) => (props.capitalize ? 'uppercase' : undefined)};
  font-family: ${(props) =>
    props.useDisplayFont ? `${fonts.EB_GARAMOND}, serif` : undefined};
  line-height: 1.2;

  ${TABLET_BP_UP} {
    font-size: ${(props) => headingSizeMap[props.size]};
  }
`
