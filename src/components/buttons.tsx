import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { getColorStyles } from 'components/blockHelpers'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'

export const buttonSizes = {
  sm: '.75rem 1.125rem',
  md: '1rem 2rem',
}

export type ButtonStyleType = 'filled' | 'outlined'
export type ButtonWeight = 'normal' | 'bold'

interface ButtonProps {
  size?: keyof typeof buttonSizes
  styleType?: ButtonStyleType
  color?: minimalColorComponentColors
  weight?: ButtonWeight
}

const getButtonTypeStyle = (
  buttonType: ButtonStyleType,
  color: minimalColorComponentColors,
) => {
  if (buttonType === 'filled') {
    return {
      backgroundColor: getColorStyles(color, colorsV3.black, '#fff').color,
      color: getColorStyles(color, colorsV3.black, '#fff').background,
      border: 'transparent',
    }
  }
  if (buttonType === 'outlined') {
    return {
      border:
        '1px solid ' + getColorStyles(color, '#fff', colorsV3.black).color,
      backgroundColor: 'transparent',
      color: getColorStyles(color, '#fff', colorsV3.black).color,
    }
  }

  return {
    border: '1px solid ' + getColorStyles(color, '#fff').color,
    backgroundColor: 'transparent',
    color: getColorStyles(color, '#fff').color,
  }
}

export const Button = styled('button')<ButtonProps>(
  ({
    size = 'sm',
    weight = 'normal',
    styleType = 'filled',
    color = 'standard',
  }) => ({
    display: 'inline-block',
    padding: buttonSizes[size],
    borderRadius: 8,
    border: `1px solid ${getColorStyles(color, '#fff').background}`,
    textDecoration: 'none',
    fontWeight: weight,
    cursor: 'pointer',
    lineHeight: '1rem',
    transition: 'background 300ms, color 300ms',
    ...getButtonTypeStyle(styleType, color),

    '&:hover': {
      ...(() => {
        const originalStyle = getButtonTypeStyle(styleType, color)
        return {
          color:
            originalStyle.backgroundColor === 'transparent'
              ? getColorStyles(color).background
              : originalStyle.backgroundColor,
          backgroundColor: originalStyle.color,
        }
      })(),
    },
  }),
)

export const ButtonLink = Button.withComponent('a')
