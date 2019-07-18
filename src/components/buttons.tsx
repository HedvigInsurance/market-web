import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'
import { colorComponentColors } from 'src/blocks/BaseBlockProps'

const buttonSizes = {
  sm: '.75rem 1.5rem',
  md: '1rem 2rem',
}

export type ButtonStyleType = 'filled' | 'outlined' | 'plain'
export type ButtonWeight = 'normal' | 'bold'

interface ButtonProps {
  size?: keyof typeof buttonSizes
  styleType?: ButtonStyleType
  color?: colorComponentColors
  weight?: ButtonWeight
}

type ColorMap = { [K in colorComponentColors]: string }

const colorMap: ColorMap = {
  standard: colors.GREEN,
  blue: colors.BLACK_PURPLE,
  'blue-dark': colors.DARK_PURPLE,
  'pink-light': colors.PINK_LIGHT,
  'pink-dark': colors.PINK,
  'off-white': colors.OFF_WHITE,
  'off-black': colors.OFF_BLACK,
  'off-black-dark': colors.OFF_BLACK_DARK,
  green: colors.GREEN,
  'green-dark': colors.DARK_GREEN,
  purple: colors.PURPLE,
  'yellow-light': colors.LIGHT_YELLOW,
  'yellow-dark': colors.DARK_YELLOW,
}

const inverseColorMap = {
  standard: colors.WHITE,
  blue: colors.WHITE,
  'blue-dark': colors.WHITE,
  'pink-light': colors.OFF_BLACK,
  'pink-dark': colors.OFF_BLACK,
  'off-white': colors.OFF_BLACK,
  'off-black': colors.WHITE,
  'off-black-dark': colors.WHITE,
  green: colors.WHITE,
  'green-dark': colors.WHITE,
  purple: colors.WHITE,
  'yellow-light': colors.OFF_BLACK,
  'yellow-dark': colors.OFF_BLACK,
}

const getButtonTypeStyle = (
  buttonType: ButtonStyleType,
  color: colorComponentColors,
) => {
  if (buttonType === 'filled') {
    return { backgroundColor: colorMap[color], color: inverseColorMap[color] }
  }
  if (buttonType === 'outlined') {
    return { backgroundColor: 'transparent', color: colorMap[color] }
  }
  return {
    border: 'none',
    padding: '0',
    backgroundColor: 'transparent',
    color: colorMap[color],
  }
}

export const Button = styled('button')(
  ({
    size = 'md',
    weight = 'normal',
    styleType = 'filled',
    color = 'standard',
  }: ButtonProps) => ({
    display: 'inline-block',
    padding: buttonSizes[size],
    borderRadius: 30,
    border: `2px solid ${colorMap[color]}`,
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

export const FilledButtonComponent = styled(Button)({
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  border: `2px solid ${colors.GREEN}`,
})

export const OutlinedButtonComponent = styled(Button)({
  color: colors.GREEN,
  backgroundColor: 'transparent',
  border: `2px solid ${colors.GREEN}`,
})

export const ButtonLink = Button.withComponent('a')
