import styled from '@emotion/styled'
import React from 'react'
import { getColorStyles, SectionWrapper } from '../components/blockHelpers'
import {
  BaseBlobProps,
  BlobDirection,
  blobHeight,
  blobOffsetStyles,
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
  overlap: boolean
}

interface SvgProps extends BaseBlobProps {
  color?: colorComponentColors
  overlap: boolean
  parentSize: SectionSize
}

interface BlobProps extends BaseBlobProps {
  parentSize: SectionSize
  color?: colorComponentColors
  overlap: boolean
}

interface SpacerProps extends BaseBlobProps {
  overlap: boolean
}

const Svg = styled('svg')<SvgProps>(
  ({ color, direction, overlap, parentSize }) => ({
    fill: color ? getColorStyles(color).background : 'white',
    ...getBlobStyles(direction),
    ...blobOffsetStyles(direction, overlap, parentSize),
    position: 'absolute',
    display: 'block',
    right: 0,
    left: 0,
  }),
)

const padding = (overlap: boolean) => {
  return overlap ? { padding: '0 !important' } : undefined
}

const Spacer = styled(SectionWrapper)<SpacerProps>(({ overlap }) => ({
  paddingBottom: '0 !important',
  position: 'relative',
  zIndex: 1,
  ...padding(overlap),
}))

const Blob: React.FunctionComponent<BlobProps> = ({
  color,
  parentSize,
  direction,
  overlap,
}) => (
  <Svg
    width="100%"
    height={blobHeight(parentSize)}
    viewBox="0 0 375 44"
    preserveAspectRatio="none"
    color={color}
    direction={direction}
    overlap={overlap}
    parentSize={parentSize}
  >
    <path d={getBlobPathData(direction)} />
  </Svg>
)

export const SpacerBlock: React.FunctionComponent<SpacerBlockProps> = ({
  size,
  color,
  blob_direction,
  blob_color,
  overlap,
}) => (
  <Spacer
    size={size}
    colorComponent={color}
    overlap={overlap}
    direction={blob_direction}
  >
    <Blob
      parentSize={size}
      direction={blob_direction}
      color={blob_color && blob_color.color}
      overlap={overlap}
    />
  </Spacer>
)
