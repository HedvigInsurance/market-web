import styled from '@emotion/styled'

type Direction = 'up' | 'down' | 'left' | 'right'
export interface SvgProps {
  fill?: string
  size?: number | string
  direction?: Direction
}

const getDirection = (direction: Direction) => {
  return `
  ${
    direction === 'right'
      ? 'rotate(-90deg)'
      : direction === 'left'
      ? 'rotate(90deg)'
      : direction === 'up'
      ? 'scaleY(-1)'
      : direction === 'down' && 'scaleY(1)'
  };
`
}

export const Svg = styled('svg')<SvgProps>(
  ({ fill = 'currentColor', size = '1em', direction = 'down' }) => ({
    fill,
    width: size,
    height: size,
    transform: getDirection(direction),
  }),
)
