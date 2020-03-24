import React from 'react'
import { Svg, SvgProps } from './Svg'

export const PlusBrandPivot: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 16 16" fill={fill} size={size} {...rest}>
    <path d="M8.5,0 L8.5,7.5 L16,7.5 L16,8.5 L8.5,8.5 L8.5,16 L7.5,16 L7.5,8.499 L0,8.5 L0,7.5 L7.5,7.499 L7.5,0 L8.5,0 Z"></path>
  </Svg>
)
