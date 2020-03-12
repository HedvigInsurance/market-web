import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { getColorStyles } from 'components/blockHelpers'
import { colorComponentColors } from 'src/blocks/BaseBlockProps'

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
