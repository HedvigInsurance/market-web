import React from 'react'
import { Svg, SvgProps } from './Svg'

export const Globe: React.FunctionComponent<SvgProps> = ({
  fill,
  size,
  ...rest
}) => (
  <Svg viewBox="0 0 24 24" fill={fill} size={size} {...rest}>
    <path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM3.5 12a8.5 8.5 0 1117 0 8.5 8.5 0 01-17 0z" />
    <path d="M11.95 14.8a8.737 8.737 0 00-5.958 2.364l-.684-.728A9.737 9.737 0 0111.95 13.8a9.841 9.841 0 016.742 2.686l-.684.728A8.842 8.842 0 0011.95 14.8zM6.042 6.686A8.841 8.841 0 0012.1 9.1a8.737 8.737 0 005.958-2.364l.684.728A9.737 9.737 0 0112.1 10.1a9.841 9.841 0 01-6.742-2.686l.684-.728z" />
    <path d="M12.5 4v16h-1V4h1z" />
    <path d="M20 12.5H4v-1h16v1z" />
    <path d="M11.025 4.53A11.196 11.196 0 008.2 12c0 2.968 1.148 5.648 3.016 7.66l-.732.68A12.204 12.204 0 017.2 12c0-3.127 1.148-5.943 3.075-8.13l.75.66zM13.67 3.765A12.197 12.197 0 0116.85 12c0 3.232-1.252 6.152-3.284 8.34l-.732-.68A11.204 11.204 0 0015.85 12c0-2.92-1.1-5.552-2.92-7.565l.74-.67z" />
  </Svg>
)