import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useEffect, useState } from 'react'
import { BaseBlockProps, MarkdownHtmlComponent } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { Caption } from 'components/Caption'
import { ImageLegacy } from 'utils/storyblok'

const CONTENT_MAX_WIDTH = '828px'
const PLAYER_WIDTH = '100%'
const OVERLAY_FADE_TIME = 1500

const StyledContentWrapper = styled(ContentWrapper)`
  max-width: ${CONTENT_MAX_WIDTH};
`

const InnerWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

const Overlay = styled.div<{ isPlaying: boolean; isOnFront: boolean }>`
  position: relative;
  transition: opacity ${OVERLAY_FADE_TIME}ms;
  z-index: ${({ isOnFront }) => (isOnFront ? 2 : 0)};
  opacity: ${({ isPlaying }) => (isPlaying ? 0 : 1)};
  color: ${colorsV3.gray100};
`

const OverlayImage = styled.img`
  display: block;
  max-width: ${CONTENT_MAX_WIDTH};
  width: ${PLAYER_WIDTH};
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

  ${TABLET_BP_UP} {
    font-size: 6rem;
  }

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
  }
`

const VideoFrame = styled.iframe`
  position: absolute;
  width: ${PLAYER_WIDTH};
  height: 100%;
  z-index: 1;
`

interface YoutubeVideoBlockProps extends BaseBlockProps {
  overlay_image: ImageLegacy
  video_id: string
  caption?: MarkdownHtmlComponent
}

export const YoutubeVideoBlock: React.FunctionComponent<YoutubeVideoBlockProps> = ({
  overlay_image,
  video_id,
  caption,
  extra_styling,
  color,
  index,
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerLoaded, setIsPlayerLoaded] = useState(false)
  const [isShowingOverlay, setIsShowingOverlay] = useState(true)

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
        <InnerWrapper>
          <Overlay
            isPlaying={isPlaying && isPlayerLoaded}
            isOnFront={isShowingOverlay}
          >
            {!isPlaying && (
              <OverlayText onClick={() => setIsPlaying(true)}>Play</OverlayText>
            )}
            {isPlaying && !isPlayerLoaded && <Spinner />}
            <OverlayImage src={overlay_image} />
          </Overlay>
          <VideoFrame
            src={`https://www.youtube.com/embed/${video_id}?autoplay=${
              isPlaying ? '1' : '0'
            }&controls=0&loop=1&playlist=${video_id}`}
            frameBorder="0"
            onLoad={() => {
              if (isPlaying) {
                setIsPlayerLoaded(true)
              }
            }}
          />
        </InnerWrapper>
        {caption && <Caption caption={caption} />}
      </StyledContentWrapper>
    </SectionWrapper>
  )
}
