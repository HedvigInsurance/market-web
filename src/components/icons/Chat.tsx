import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Chat: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 48 48" fill={fill} size={size} {...rest}>
    <path d="M35.1 22.4H13v-2h22.1v2z" />
    <path d="M7 16c0-2.752 2.248-5 5-5h24c2.852 0 5 2.148 5 5v11c0 2.752-2.248 5-5 5H22.38l-5.155 4.583-.044.03A2 2 0 0114 35v-3h-2c-2.752 0-5-2.248-5-5V16zm5-3c-1.648 0-3 1.352-3 3v11c0 1.648 1.352 3 3 3h4v4.995L21.62 30H36c1.648 0 3-1.352 3-3V16c0-1.748-1.252-3-3-3H12z" />
    <path d="M29.1 26.4H13v-2h16.1v2zM35.1 18.4H13v-2h22.1v2z" />
  </Svg>
)
