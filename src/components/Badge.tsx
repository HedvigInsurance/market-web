import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export const Badge = styled('span')({
  backgroundColor: colors.LIGHT_GRAY,
  color: colors.DARK_GRAY,
  borderRadius: 16,
  padding: '0.25rem .75rem',
  marginRight: '0.9rem',
  fontSize: '0.75rem',
  textDecoration: 'none',
})
