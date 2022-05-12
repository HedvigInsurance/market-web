import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Tick = ({ fill, size, ...rest }: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill={fill} size={size} {...rest}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.5 4.01812L7.82551 16.539L0.5 8.90064L1.5775 7.86726L7.81023 14.3662L18.4081 3L19.5 4.01812Z"
    />
  </Svg>
)
