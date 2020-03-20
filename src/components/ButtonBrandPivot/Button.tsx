import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  colorComponentColors,
  minimalColorComponentColors,
} from 'src/blocks/BaseBlockProps'
import { getMinimalColorStyles } from '../blockHelpers'

export const buttonSizes = {
  sm: '.75rem 1.5rem',
  md: '1rem 2rem',
}

export type ButtonStyleType = 'filled' | 'outlined' | 'plain'
export type ButtonWeight = 'normal' | 'bold'

export interface ButtonProps<TColor = colorComponentColors> {
  size?: keyof typeof buttonSizes
  styleType?: ButtonStyleType
  color?: TColor
}

const getMinimalButtonTypeStyle = (
  buttonType: ButtonStyleType,
  color: minimalColorComponentColors,
) => {
  if (buttonType === 'filled') {
    return {
      backgroundColor: getMinimalColorStyles(
        color,
        colorsV3.gray900,
        colorsV3.white,
      ).background,
      color: getMinimalColorStyles(color, colorsV3.gray900, colorsV3.white)
        .color,
    }
  }
  if (buttonType === 'plain') {
    return {
      border: 'none',
      padding: '0',
      backgroundColor: 'transparent',
      color: getMinimalColorStyles(color, colorsV3.gray900, colorsV3.white)
        .background,
    }
  } else {
    // Outlined or nothing
    return {
      backgroundColor: 'transparent',
      color: getMinimalColorStyles(color, colorsV3.gray900, colorsV3.white)
        .background,
    }
  }
}

export const ButtonBrandPivot = styled('button')<
  ButtonProps<minimalColorComponentColors>
>(({ styleType = 'filled', color = 'standard', size = 'md' }) => {
  const colorStyles = getMinimalColorStyles(
    color,
    colorsV3.gray900,
    colorsV3.white,
  )
  return {
    display: 'inline-block',
    padding: buttonSizes[size],
    borderRadius: 8,
    border: `1px solid ${colorStyles.background}`,
    textDecoration: 'none',
    fontWeight: 'normal',
    cursor: 'pointer',
    lineHeight: '1rem',
    transition: 'background 150ms, color 150ms',
    ...getMinimalButtonTypeStyle(styleType, color),

    '&:hover': {
      ...getMinimalButtonTypeStyle(styleType, color),
      ...(styleType === 'outlined'
        ? {
            background: colorStyles.background,
            color: colorStyles.color,
          }
        : {}),
    },
  }
})

export const ButtonLinkBrandPivot = ButtonBrandPivot.withComponent('a')
