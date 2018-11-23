import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'

const buttonSizes = {
  sm: '.7rem 1.5rem',
  md: '1rem 2rem',
}

interface ButtonProps {
  size?: keyof typeof buttonSizes
  bold?: boolean
  type?: 'filled' | 'outlined' | 'plain'
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

const getButtonTypeStyle = (buttonType: 'filled' | 'outlined' | 'plain') => {
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
