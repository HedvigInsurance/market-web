import { SectionSize } from './SectionSize'

export type BlobDirection = 'none' | 'up' | 'down'
export interface BaseBlobProps {
  direction: BlobDirection
}

const blobDirectionStyles = {
  none: {
    top: 0,
    display: 'none',
  },
  up: {
    top: 'auto',
    bottom: 0,
  },
  down: {
    top: 0,
    bottom: 'auto',
  },
}

export const blobHeight = (parentSize: SectionSize) => {
  switch (parentSize) {
    case 'xl':
      return 84
    case 'lg':
      return 45
    case 'sm':
      return 30
    case 'none':
      return 0
  }
}

export const blobOffsetStyles = (
  direction: BlobDirection,
  overlap: boolean,
  parentSize: SectionSize,
) => {
  if (overlap) {
    switch (direction) {
      case 'none':
        return undefined
      case 'up':
        return { top: -blobHeight(parentSize) }
      case 'down':
        return { bottom: -blobHeight(parentSize) }
    }
  }
  return undefined
}

const upBlobPathData =
  'M755 89.2194H0C0 69.6543 15 63.1325 44 63.1325C190.4 59.5205 288.149 25.884 321.5 18.4839C373.5 6.94562 432.5 -9.50935 570.5 6.94545C708.5 23.4002 751 68.6509 755 89.2194Z'
const downBlobPathData =
  'M755 7.36336e-05L7.29981e-06 7.62939e-06C5.58938e-06 19.5651 71.5 38.663 139.5 43.4999C259 52.0001 282.5 58.2313 318 64.0001C358 70.5002 398.461 83.5002 531 83.5002C649.5 83.5001 751 20.5686 755 7.36336e-05Z'

const blobPathData = {
  none: '',
  up: upBlobPathData,
  down: downBlobPathData,
}

export const getBlobStyles = (direction: BlobDirection) =>
  blobDirectionStyles[direction]
export const getBlobPathData = (direction: BlobDirection) =>
  blobPathData[direction]
