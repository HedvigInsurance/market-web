import styled from '@emotion/styled'
import React from 'react'

type Props = {
  className?: string
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>

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

export const DeferredImage = ({ src, className, ...rest }: Props) => {
  const sizeProps = src ? getSizeFromURL(src) : ''
  return (
    <Img
      className={className}
      loading="lazy"
      src={src}
      {...sizeProps}
      {...rest}
    />
  )
}
