import styled from '@emotion/styled'
import React from 'react'

const getSizeFromURL = (url: string) => {
  const [, rawWidth, rawHeight] = url.match(/\/(\d+)x(\d+)\//) || []

  const width = parseInt(rawWidth, 10) || 0
  const height = parseInt(rawHeight, 10) || 0
  return { width, height }
}

const Img = styled.img({
  maxWidth: '100%',
  height: 'auto',
})

export const DeferredImage = ({
  src,
}: React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  const sizeProps = src ? getSizeFromURL(src) : ''
  return <Img {...sizeProps} loading="lazy" src={src} />
}
