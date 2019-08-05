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
    bottom: -1,
  },
  down: {
    top: -1,
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
        return { top: -(blobHeight(parentSize) - 1), bottom: 'auto' }
      case 'down':
        return { bottom: -(blobHeight(parentSize) - 1), top: 'auto' }
    }
  }
  return undefined
}

const upBlobPathData =
  'M.032 44A9.744 9.744 0 0 1 0 43.207c0-24.246 54 2.987 151-30.379s224 6.133 224 30.38c0 .263-.01.527-.031.792H.032z'
const downBlobPathData =
  'M375 0c-1.88 24.168-89.064 56.443-187.5 39.073C89.08 21.705 1.91 23.413 0 0h375z'

const blobPathData = {
  none: '',
  up: upBlobPathData,
  down: downBlobPathData,
}

export const getBlobStyles = (direction: BlobDirection) =>
  blobDirectionStyles[direction]
export const getBlobPathData = (direction: BlobDirection) =>
  blobPathData[direction]
