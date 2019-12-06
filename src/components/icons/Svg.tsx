import styled from '@emotion/styled'

export interface SvgProps {
  fill?: string
  size?: number | string
}

export const Svg = styled('svg')<SvgProps>(
  ({ fill = 'currentColor', size = '1em' }) => ({
    fill,
    width: size,
    height: size,
  }),
)
