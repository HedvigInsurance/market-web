import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'

const buttonSizes = {
  sm: '10px 20px',
  md: '15px 40px',
}

interface ButtonInterface {
  size?: keyof typeof buttonSizes
}

const Button = styled('button')(({ size = 'md' }: ButtonInterface) => ({
  padding: buttonSizes[size],
  margin: 0,
  borderRadius: 30,
  cursor: 'pointer',
  boxSizing: 'border-box',
  display: 'inline-block',
  flex: '0 1 auto',
  flexBasis: 'auto',
  font: 'inherit',
  position: 'relative',
  textAlign: 'center',
  textDecoration: 'none',
  userSelect: 'none',
}))

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
