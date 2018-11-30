import styled from 'react-emotion'
import { getColorStyles, getSectionSizeStyle } from '../components/blockHelpers'
import { SectionSize } from '../utils/SectionSize'
import { BaseBlockProps } from './BaseBlockProps'

interface SpacerBlockProps extends BaseBlockProps {
  size: SectionSize
}

export const SpacerBlock = styled('div')(
  ({ size, color }: SpacerBlockProps) => ({
    ...getColorStyles(color ? color.color : 'standard'),
    ...getSectionSizeStyle(size),
    paddingBottom: '0 !important',
  }),
)
