import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Minus: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 16 16" fill={fill} size={size} {...rest}>
    <path d="M0 7v1.25h16V7z" />
  </Svg>
)
