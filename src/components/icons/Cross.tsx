import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Cross: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 16 16" fill={fill} size={size} {...rest}>
    <path d="M8.625 7.375V0h-1.25v7.375H0v1.25h7.375V16h1.25V8.625H16v-1.25z" />
  </Svg>
)
