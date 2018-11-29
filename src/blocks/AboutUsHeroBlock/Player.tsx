import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import { Update } from 'react-lifecycle-components'

interface HeightContainerProps {
  isFullScreen: boolean
}

const fadeInKeyframe = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const HeightContainer = styled('div')(
  {
    animation: `${fadeInKeyframe} 2000ms forwards`,
    transition: 'height 1500ms, padding 1500ms',
    height: 475,
    backgroundColor: 'black',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    '@media (min-width: 500px)': {
      height: 550,
    },
    '@media (min-width: 700px)': {
      height: 600,
    },
  },
  ({ isFullScreen }: HeightContainerProps) =>
    isFullScreen
      ? {
          height: 'calc(100vh - 70px) !important',
        }
      : null,
)

const Video = styled('video')(
  {
    width: '100%',
    objectFit: 'cover',
    transition: 'height 1500ms',
    overflow: 'hidden',
    borderRadius: 0.01,
  },
  ({ isFullScreen }: HeightContainerProps) =>
    isFullScreen
      ? {
          height: '30%',
          '@media(min-width: 600px)': {
            height: '60%',
          },
          '@media(min-width: 1000px)': {
            height: '100%',
          },
        }
      : {
          height: '100%',
        },
)

interface PlayerProps {
  isFullScreen: boolean
  videoRef: React.RefObject<HTMLVideoElement>
}

const restartVideo = ({ isFullScreen, videoRef }: PlayerProps) => () => {
  if (!videoRef.current || !isFullScreen) {
    return
  }

  const video = videoRef.current

  video.pause()
  video.currentTime = 0
  video.play()
}

interface FullScreenUpdate {
  isFullScreen: boolean
}

const baseVideoUrl = `https://cdn.hedvig.com/www/about-us-video`

export const Player: React.SFC<PlayerProps> = ({ isFullScreen, videoRef }) => (
  <Update<FullScreenUpdate>
    was={restartVideo({ isFullScreen, videoRef })}
    watched={{ isFullScreen }}
  >
    <HeightContainer isFullScreen={isFullScreen}>
      <Video
        poster="/assets-next/about-us/about-us-hero-poster.png"
        innerRef={videoRef}
        playsInline
        autoPlay
        muted={!isFullScreen}
        loop={!isFullScreen}
        controls={isFullScreen}
        isFullScreen={isFullScreen}
      >
        <source
          src={`${baseVideoUrl}/about-us-video.m3u8`}
          type="application/vnd.apple.mpegurl"
        />
        <source src={`${baseVideoUrl}/web.mp4`} type="video/mp4" />
        <source src={`${baseVideoUrl}/web.webm`} type="video/webm" />
      </Video>
    </HeightContainer>
  </Update>
)
