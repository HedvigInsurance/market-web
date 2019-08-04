import * as React from 'react'
import styled, { keyframes } from 'react-emotion'

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

const HeightContainer = styled('div')(
  ({ backgroundColor }: BackgroundProps) => ({
    animation: `${fadeInKeyframe} 2000ms forwards`,
    transition: 'height 1500ms, padding 1500ms',
    height: '90vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor,
  }),
)

const VideoWrapper = styled('div')({
  height: '90vh',
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
})

const Video = styled('video')({
  width: '100%',
  objectFit: 'cover',
  transition: 'height 1500ms',
  overflow: 'hidden',
  borderRadius: 0.01,
  position: 'absolute',
  bottom: 0,
  right: 0,
  left: 0,
  height: '100vh',
  '@media(min-width: 1500px)': {
    height: '110vh',
  },
})

interface PlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>
  baseVideoUrl: string
}

export const Player: React.SFC<PlayerProps & BackgroundProps> = ({
  videoRef,
  baseVideoUrl,
  backgroundColor,
}) => (
  <HeightContainer backgroundColor={backgroundColor}>
    <VideoWrapper>
      <Video
        poster={`${baseVideoUrl}.png`}
        innerRef={videoRef}
        playsInline
        autoPlay
        muted={true}
        loop={true}
        controls={false}
      >
        <source
          src={`${baseVideoUrl}.m3u8`}
          type="application/vnd.apple.mpegurl"
        />
        <source src={`${baseVideoUrl}.mp4`} type="video/mp4" />
        <source src={`${baseVideoUrl}.webm`} type="video/webm" />
      </Video>
    </VideoWrapper>
  </HeightContainer>
)
