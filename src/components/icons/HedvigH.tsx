import styled from '@emotion/styled'
import * as React from 'react'

const Svg = styled('svg')({
  fill: 'currentColor',
})

export const HedvigH: React.FunctionComponent<{ size?: number }> = ({
  size = 32,
}) => (
  <Svg width={String(size)} height={String(size)} viewBox="0 0 300 300">
    <g fillRule="nonzero">
      <path d="M150 0C67.157 0 0 67.157 0 150s67.157 150 150 150 150-67.157 150-150A150 150 0 00150 0zm0 279.59c-71.44 0-129.56-58.07-129.56-129.57C20.523 78.5 78.48 20.543 150 20.46c71.45 0 129.57 58.12 129.57 129.56-.077 71.528-58.042 129.493-129.57 129.57z" />
      <path d="M194.33 139.8h-88.65V68.19H85.22v163.67h20.46v-71.61h88.65v71.61h20.46V68.19h-20.46z" />
    </g>
  </Svg>
)
