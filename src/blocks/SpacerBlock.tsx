import styled from '@emotion/styled'
import * as React from 'react'
import { SectionWrapper } from '../components/blockHelpers'
import { SectionSize } from '../utils/SectionSize'
import {
  BaseBlockProps,
  MinimalColorComponent,
  minimalColorComponentColors,
} from './BaseBlockProps'

interface SpacerBlockProps extends BaseBlockProps {
  size: SectionSize
  color: MinimalColorComponent
}

interface SpacerProps {
  color?: minimalColorComponentColors
}

const Spacer = styled(SectionWrapper)<SpacerProps>({
  paddingBottom: '0 !important',
  position: 'relative',
  zIndex: 1,
})

export const SpacerBlock: React.FunctionComponent<SpacerBlockProps> = ({
  size,
  color,
}) => <Spacer size={size} color={color?.color} />
