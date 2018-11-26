import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'

const buttonSizes = {
  sm: '.7rem 1.5rem',
  md: '1rem 2rem',
}

export type ButtonType = 'filled' | 'outlined' | 'plain'

interface ButtonProps {
  size?: keyof typeof buttonSizes
  bold?: boolean
  type?: ButtonType
}

const buttonTypeStyles = {
  filled: {
    backgroundColor: colors.GREEN,
    color: colors.WHITE,
  },
  outlined: {
    backgroundColor: 'transparant',
    color: colors.GREEN,
  },
  plain: {
    border: 'none',
    padding: '0',
    backgroundColor: 'transparant',
    color: colors.GREEN,
  },
}

const getButtonTypeStyle = (buttonType: ButtonType) => {
  return buttonTypeStyles[buttonType]
}

export const Button = styled('button')(
  ({ size = 'md', bold = false, type = 'filled' }: ButtonProps) => ({
    display: 'inline-block',
    padding: buttonSizes[size],
    borderRadius: 30,
    border: `2px solid ${colors.GREEN}`,
    textDecoration: 'none',
    fontWeight: bold ? 'bold' : 'normal',
    cursor: 'pointer',
    ...getButtonTypeStyle(type),
  }),
)

export const ButtonLink = Button.withComponent('a')
