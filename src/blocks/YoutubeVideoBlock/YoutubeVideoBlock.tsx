import { css, keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'utils/storyblok'

const StyledContentWrapper = styled(ContentWrapper)`
  display: flex;
  justify-content: center;
`

const OVERLAY_FADE_TIME = 1500
const Overlay = styled.div<{ isPlaying: boolean; isOnFront: boolean }>`
  position: relative;
  transition: opacity ${OVERLAY_FADE_TIME}ms;
  z-index: ${({ isOnFront }) => (isOnFront ? 2 : 0)};
  color: ${colorsV3.gray100};

  ${TABLET_BP_UP} {
    color: ${colorsV3.white};
    font-size: 6rem;
  }

  ${({ isPlaying }) =>
    isPlaying
      ? css`
          opacity: 0;

          button {
            transform: scale(1.1);
            transition: transform ${OVERLAY_FADE_TIME}ms;
          }
        `
      : css`
          opacity: 1;

          button {
            transform: scale(1);
            transition: transform ${OVERLAY_FADE_TIME}ms;
          }
        `}
`

const OverlayImage = styled.img`
  max-width: 828px;
  width: 100%;
`

const OverlayText = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-family: inherit;
  color: inherit;
  background: transparent;
  border: 0;
  text-shadow: 0 0.5rem 7.5rem rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &:focus {
    outline: 0;
    box-shadow: none;
  }
`

const spinCentered = keyframes`
  from {
    transform: translateY(-50%) translateX(-50%) rotate(0deg);
  }
  to {
    transform: translateY(-50%) translateX(-50%) rotate(360deg);
  }
`
const fade = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1
  }
`
const Spinner = styled.div`
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: 4rem;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 100%;
  animation: ${spinCentered} 500ms linear infinite, ${fade} 700ms forwards;

  ${TABLET_BP_UP} {
    border-width: 3px;
    width: 4rem;
    height: 4rem;
  }
`

const VideoFrame = styled.iframe<{ width?: number; height?: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  z-index: 1;
`

interface YoutubeVideoBlockProps extends BrandPivotBaseBlockProps {
  overlay_image: Image
  video_id: string
}

export const YoutubeVideoBlock: React.FunctionComponent<YoutubeVideoBlockProps> = ({
  overlay_image,
  video_id,
  extra_styling,
  color,
  index,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerLoaded, setPlayerLoaded] = useState(false)
  const [isShowingOverlay, setIsShowingOverlay] = useState(true)
  const [playerResizeInterval, setPlayerResizeInterval] = useState<
    number | null
  >(null)
  const [playerWidth, setPlayerWidth] = useState(0)
  const [playerHeight, setPlayerHeight] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    setPlayerResizeInterval(
      window.setInterval(() => {
        setPlayerWidth(imageRef?.current?.width ?? 0)
        setPlayerHeight(imageRef?.current?.height ?? 0)
      }, 50),
    )

    return () => {
      if (playerResizeInterval) {
        clearInterval(playerResizeInterval)
      }
    }
  }, [])
  useEffect(() => {
    if (isPlaying && isPlayerLoaded) {
      setTimeout(() => {
        setIsShowingOverlay(false)
      }, OVERLAY_FADE_TIME)
    }
  }, [isPlaying, isPlayerLoaded])

  return (
    <SectionWrapper
      colorComponent={color}
      extraStyling={extra_styling}
      brandPivot
    >
      <StyledContentWrapper index={index} brandPivot>
        <Overlay
          isPlaying={isPlaying && isPlayerLoaded}
          isOnFront={isShowingOverlay}
        >
          {!isPlaying && (
            <OverlayText onClick={() => setIsPlaying(!isPlaying)}>
              Play
            </OverlayText>
          )}
          {isPlaying && !isPlayerLoaded && <Spinner />}
          <OverlayImage src={overlay_image} ref={imageRef} />
        </Overlay>
        <VideoFrame
          width={playerWidth}
          height={playerHeight}
          src={`https://www.youtube.com/embed/${video_id}?autoplay=${
            isPlaying ? '1' : '0'
          }&controls=0&loop=1&playlist=${video_id}`}
          frameBorder="0"
          onLoad={() => {
            if (isPlaying) {
              setPlayerLoaded(true)
            }
          }}
        />
      </StyledContentWrapper>
    </SectionWrapper>
  )
}
