import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Dash = ({ fill, size, ...rest }: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill={fill} size={size} {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 10.875H0V9.625H20V10.875Z"
    />
  </Svg>
)
