import styled from 'react-emotion'

export interface SvgProps {
  fill?: string
  size?: number | string
}

export const Svg = styled('svg')(
  ({ fill = 'currentColor', size = '1em' }: SvgProps) => ({
    fill,
    width: size,
    height: size,
  }),
)
