import styled from '@emotion/styled'
import React from 'react'
import { SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps } from './BaseBlockProps'

const Spacer = styled(SectionWrapper)`
  padding-bottom: 0 !important;
  z-index: 1;
`

export const SpacerBlock: React.FunctionComponent<BaseBlockProps> = ({
  size,
  color,
  extra_styling,
}) => (
  <Spacer
    brandPivot
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  />
)
