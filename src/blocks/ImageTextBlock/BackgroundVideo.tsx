import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import MediaQuery from 'react-responsive'
import { backgroundImageStyles } from '../../components/blockHelpers'
import { DeferredVideo } from '../../components/DeferredVideo'

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
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    backgroundColor,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  }),
)

const BackgroundImage = styled('div')(({ image }: { image: string }) => ({
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  ...backgroundImageStyles(image),
}))

const VideoWrapper = styled('div')({
  height: '100%',
  overflow: 'hidden',
  width: '100%',
  position: 'relative',
})

interface PlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>
  mobileVideoRef: React.RefObject<HTMLVideoElement>
  baseMobileVideoUrl: string
  baseVideoUrl: string
  desktopImage: string
  mobileImage: string
}

interface VideoItemProps {
  videoUrl: string
  videoRef: React.RefObject<HTMLVideoElement>
}

const VideoItem: React.FunctionComponent<VideoItemProps> = ({
  videoUrl,
  videoRef,
}) => (
  <VideoWrapper>
    <DeferredVideo src={videoUrl} />
  </VideoWrapper>
)

export const BackgroundVideo: React.SFC<PlayerProps & BackgroundProps> = ({
  videoRef,
  mobileVideoRef,
  desktopImage,
  mobileImage,
  baseVideoUrl,
  baseMobileVideoUrl,
  backgroundColor,
}) => (
  <HeightContainer backgroundColor={backgroundColor}>
    <MediaQuery query="(max-width: 700px)">
      {baseMobileVideoUrl ? (
        <VideoItem videoUrl={baseMobileVideoUrl} videoRef={mobileVideoRef} />
      ) : (
        mobileImage && <BackgroundImage image={mobileImage} />
      )}
    </MediaQuery>
    <MediaQuery query="(min-width: 701px)">
      {baseVideoUrl ? (
        <VideoItem videoUrl={baseVideoUrl} videoRef={videoRef} />
      ) : (
        desktopImage && <BackgroundImage image={desktopImage} />
      )}
    </MediaQuery>
  </HeightContainer>
)
