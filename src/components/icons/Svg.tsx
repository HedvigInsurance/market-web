import styled from '@emotion/styled'
import { match } from 'matchly'

type Direction = 'up' | 'down' | 'left' | 'right'
export interface SvgProps {
  fill?: string
  size?: number | string
  direction?: Direction
}

const getDirection = (direction?: Direction) =>
  match([
    ['right', 'rotate(-90deg)'],
    ['left', 'rotate(90deg)'],
    ['up', 'scaleY(-1)'],
    ['down', 'scaleY(1)'],
    [match.any(), undefined],
  ])(direction)!

export const Svg = styled('svg')<SvgProps>(
  ({ fill = 'currentColor', size = '1em', direction }) => ({
    fill,
    width: size,
    height: size,
    transform: getDirection(direction),
  }),
)
