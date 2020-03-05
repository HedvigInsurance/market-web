import styled from '@emotion/styled'
import { colors, colorsV3 } from '@hedviginsurance/brand'
import { getColorStyles, getMinimalColorStyles } from 'components/blockHelpers'
import {
  colorComponentColors,
  minimalColorComponentColors,
} from 'src/blocks/BaseBlockProps'

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
  weight?: ButtonWeight
}

const getButtonTypeStyle = (
  buttonType: ButtonStyleType,
  color: colorComponentColors,
) => {
  if (buttonType === 'filled') {
    return {
      backgroundColor: getColorStyles(color, colors.PURPLE).background,
      color: getColorStyles(color, colors.PURPLE, colors.WHITE).color,
    }
  }
  if (buttonType === 'outlined') {
    return {
      backgroundColor: 'transparent',
      color: getColorStyles(color, colors.PURPLE, colors.WHITE).background,
    }
  }

  return {
    border: 'none',
    padding: '0',
    backgroundColor: 'transparent',
    color: getColorStyles(color, colors.PURPLE, colors.WHITE).background,
  }
}

const getMinimalButtonTypeStyle = (
  buttonType: ButtonStyleType,
  color: minimalColorComponentColors,
) => {
  if (buttonType === 'filled') {
    return {
      backgroundColor: getMinimalColorStyles(
        color,
        colorsV3.black,
        colorsV3.white,
      ).background,
      color: getMinimalColorStyles(color, colorsV3.black, colorsV3.white).color,
    }
  }
  if (buttonType === 'plain') {
    return {
      border: 'none',
      padding: '0',
      backgroundColor: 'transparent',
      color: getMinimalColorStyles(color, colorsV3.black, colorsV3.white)
        .background,
    }
  } else {
    // Outlined or nothing
    return {
      backgroundColor: 'transparent',
      color: getMinimalColorStyles(color, colorsV3.black, colorsV3.white)
        .background,
    }
  }
}

export const Button = styled('button')<ButtonProps>(
  ({
    size = 'md',
    weight = 'bold',
    styleType = 'filled',
    color = 'standard',
  }) => ({
    display: 'inline-block',
    padding: buttonSizes[size],
    borderRadius: 30,
    border: `2px solid ${
      getColorStyles(color, colors.PURPLE, colors.WHITE).background
    }`,
    textDecoration: 'none',
    fontWeight: weight,
    cursor: 'pointer',
    lineHeight: '1rem',
    ...getButtonTypeStyle(styleType, color),

    '&:hover': {
      ...getButtonTypeStyle(styleType, color),
    },
  }),
)

export const ButtonLink = Button.withComponent('a')

export const BrandPivotButton = styled('button')<
  ButtonProps<minimalColorComponentColors>
>(
  ({
    size = 'md',
    weight = 'bold',
    styleType = 'filled',
    color = 'standard',
  }) => {
    const colorStyles = getMinimalColorStyles(
      color,
      colorsV3.black,
      colorsV3.white,
    )
    return {
      display: 'inline-block',
      padding: buttonSizes[size],
      borderRadius: 8,
      border: `1px solid ${colorStyles.background}`,
      textDecoration: 'none',
      fontWeight: weight,
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
  },
)

export const BrandPivotButtonLink = BrandPivotButton.withComponent('a')
