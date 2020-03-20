import styled from '@emotion/styled'
import React from 'react'
import { SectionWrapper } from '../components/blockHelpers'
import { SectionSize } from '../utils/SectionSize'
import { BrandPivotBaseBlockProps } from './BaseBlockProps'

interface SpacerBlockProps extends BrandPivotBaseBlockProps {
  size: SectionSize
}

const Spacer = styled(SectionWrapper)({
  paddingBottom: '0 !important',
  position: 'relative',
  zIndex: 1,
})

export const SpacerBlockBrandPivot: React.FunctionComponent<SpacerBlockProps> = ({
  size,
  color,
}) => <Spacer size={size} colorComponent={color} brandPivot />
