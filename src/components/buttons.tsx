import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'

const buttonSizes = {
  sm: '.7rem 1.5rem',
  md: '1rem 2rem',
}

interface ButtonProps {
  size?: keyof typeof buttonSizes
  bold?: boolean
}

export const Button = styled('button')(
  ({ size = 'md', bold = false }: ButtonProps) => ({
    backgroundColor: colors.GREEN,
    padding: buttonSizes[size],
    borderRadius: 30,
    border: 'none',
    textDecoration: 'none',
    fontWeight: bold ? 'bold' : 'normal',
    color: colors.WHITE,
    cursor: 'pointer',
  }),
)

export const ButtonLink = Button.withComponent('a')
