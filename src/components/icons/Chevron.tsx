import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Chevron: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 16 16" size={size} {...rest}>
    <path
      fill={fill}
      fill-rule="evenodd"
      d="M8 10.873L1.127 4 0 5.127l7.437 7.436a.797.797 0 001.126 0L16 5.127 14.873 4 8 10.873z"
    />
  </Svg>
)
