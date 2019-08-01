import * as React from 'react'
import styled from 'react-emotion'
import { getColorStyles, SectionWrapper } from '../components/blockHelpers'
import {
  BaseBlobProps,
  BlobDirection,
  getBlobPathData,
  getBlobStyles,
} from '../utils/BlobDirection'
import { SectionSize } from '../utils/SectionSize'
import {
  BaseBlockProps,
  ColorComponent,
  colorComponentColors,
} from './BaseBlockProps'

interface SpacerBlockProps extends BaseBlockProps {
  size: SectionSize
  blob_direction: BlobDirection
  blob_color?: ColorComponent
}

interface SvgProps extends BaseBlobProps {
  color?: colorComponentColors
}

interface BlobProps extends BaseBlobProps {
  parentSize: SectionSize
  color?: colorComponentColors
}

const Svg = styled('svg')(({ color, direction }: SvgProps) => ({
  fill: color ? getColorStyles(color).background : 'white',
  ...getBlobStyles(direction),
  position: 'absolute',
  right: 0,
  left: 0,
}))

const Spacer = styled(SectionWrapper)({
  paddingBottom: '0 !important',
  position: 'relative',
})

const Blob: React.FunctionComponent<BlobProps> = ({
  color,
  parentSize,
  direction,
}) => (
  <Svg
    width="100%"
    height={parentSize !== 'xl' ? '50%' : '84'}
    viewBox="0 0 755 84"
    preserveAspectRatio="none"
    color={color}
    direction={direction}
  >
    <path d={getBlobPathData(direction)} />
  </Svg>
)

export const SpacerBlock: React.FunctionComponent<SpacerBlockProps> = ({
  size,
  color,
  blob_direction,
  blob_color,
}) => (
  <Spacer size={size} color={color && color.color}>
    <Blob
      parentSize={size}
      direction={blob_direction}
      color={blob_color && blob_color.color}
    />
  </Spacer>
)
