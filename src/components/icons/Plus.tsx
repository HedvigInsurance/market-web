import * as React from 'react'
import { Svg, SvgProps } from './Svg'

export const Plus: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 357 357" fill={fill} size={size} {...rest}>
    <path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z" />
  </Svg>
)
