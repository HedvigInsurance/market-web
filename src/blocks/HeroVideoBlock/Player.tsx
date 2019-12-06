import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import * as React from 'react'

import { Update } from 'react-lifecycle-components'

interface HeightContainerProps {
  isFullScreen: boolean
}
interface BackgroundProps {
  backgroundColor: string
}

const fadeInKeyframe = keyframes({
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
})

const HeightContainer = styled('div')<HeightContainerProps & BackgroundProps>(
  ({ backgroundColor }) => ({
    animation: `${fadeInKeyframe} 2000ms forwards`,
    transition: 'height 1500ms, padding 1500ms',
    height: 475,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor,
    '@media (min-width: 500px)': {
      height: 550,
    },
    '@media (min-width: 700px)': {
      height: 600,
    },
  }),
  ({ isFullScreen }: HeightContainerProps & BackgroundProps) =>
    isFullScreen
      ? {
          height: 'calc(100vh - 70px) !important',
        }
      : null,
)

const Video = styled('video')<HeightContainerProps>(
  {
    width: '100%',
    objectFit: 'cover',
    transition: 'height 1500ms',
    overflow: 'hidden',
    borderRadius: 0.01,
  },
  ({ isFullScreen }) =>
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
  baseVideoUrl: string
}

const restartVideo = ({
  isFullScreen,
  videoRef,
}: Pick<PlayerProps, 'isFullScreen' | 'videoRef'>) => () => {
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

export const Player: React.SFC<PlayerProps & BackgroundProps> = ({
  isFullScreen,
  videoRef,
  baseVideoUrl,
  backgroundColor,
}) => (
  <Update<FullScreenUpdate>
    was={restartVideo({ isFullScreen, videoRef })}
    watched={{ isFullScreen }}
  >
    <HeightContainer
      isFullScreen={isFullScreen}
      backgroundColor={backgroundColor}
    >
      <Video
        poster={`${baseVideoUrl}.png`}
        ref={videoRef}
        playsInline
        autoPlay
        muted={!isFullScreen}
        loop={!isFullScreen}
        controls={isFullScreen}
        isFullScreen={isFullScreen}
      >
        <source
          src={`${baseVideoUrl}.m3u8`}
          type="application/vnd.apple.mpegurl"
        />
        <source src={`${baseVideoUrl}.mp4`} type="video/mp4" />
        <source src={`${baseVideoUrl}.webm`} type="video/webm" />
      </Video>
    </HeightContainer>
  </Update>
)
