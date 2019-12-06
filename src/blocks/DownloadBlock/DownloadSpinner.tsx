import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
const SpinnerContainer = styled('div')({
  display: 'inline-block',
  height: 64,
  position: 'relative',
  width: 64,
})
const Bounce1 = keyframes({
  '0%': { transform: 'scale(0)' },
  '100%': { transform: 'scale(1)' },
})
const Bounce2 = keyframes({
  '0%': { transform: 'translate(0,0)' },
  '100%': { transform: 'translate(19px,0)' },
})
const Bounce3 = keyframes({
  '0%': { transform: 'scale(1)' },
  '100%': { transform: 'scale(0)' },
})
const SpinnerBall = styled('div')({
  animationTimingFunction: 'cubic-bezier(0,1,1,0)',
  background: colors.PURPLE,
  borderRadius: '50%',
  height: 11,
  position: 'absolute',
  top: 27,
  width: 11,
})
const Ball1 = styled(SpinnerBall)({
  animation: `${Bounce1} 0.6s infinite`,
  left: 6,
})
const Ball2 = styled(SpinnerBall)({
  animation: `${Bounce2} 0.6s infinite`,
  left: 6,
})
const Ball3 = styled(SpinnerBall)({
  animation: `${Bounce2} 0.6s infinite`,
  left: 26,
})
const Ball4 = styled(SpinnerBall)({
  animation: `${Bounce3} 0.6s infinite`,
  left: 45,
})
export const DownloadSpinner: React.SFC = () => (
  <SpinnerContainer>
    <Ball1 />
    <Ball2 />
    <Ball3 />
    <Ball4 />
  </SpinnerContainer>
)
