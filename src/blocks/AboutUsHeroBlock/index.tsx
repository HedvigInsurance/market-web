import { ActionMap, Container } from 'constate'
import isIOS from 'is-ios'
import * as React from 'react'
import styled from 'react-emotion'

import {
  CONTENT_GUTTER,
  CONTENT_GUTTER_MOBILE,
  CONTENT_MAX_WIDTH,
  MOBILE_BP_DOWN,
} from '../../components/blockHelpers'
import { BaseBlockProps } from '../BaseBlockProps'
import { CloseButton } from './CloseButton'
import { Player } from './Player'
import { Title } from './Title'

interface AboutUsHeroBlockProps extends BaseBlockProps {
  headline: string
  title: string
  play_button_text: string
}

const Background = styled('div')({
  backgroundColor: 'black',
})

const HeroContainer = styled('div')({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  maxWidth: CONTENT_MAX_WIDTH,
  margin: '0 auto',
})

interface ShadowProps {
  hidden: boolean
}

const Shadow = styled('div')(
  {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: CONTENT_GUTTER,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    transition: 'opacity 1000ms',

    [MOBILE_BP_DOWN]: {
      padding: CONTENT_GUTTER_MOBILE,
    },
  },
  ({ hidden }: ShadowProps) => ({
    opacity: hidden ? 0 : 1,
    pointerEvents: hidden ? 'none' : 'all',
  }),
)

interface State {
  isFullScreen: boolean
  videoRef: React.RefObject<HTMLVideoElement>
}

interface Actions {
  setFullScreen: (isFullScreen: boolean) => void
  setVideoRef: (videoRef: React.RefObject<HTMLVideoElement>) => void
}

const actions: ActionMap<State, Actions> = {
  setFullScreen: (isFullScreen) => () => ({
    isFullScreen,
  }),
  setVideoRef: (videoRef) => () => ({
    videoRef,
  }),
}

const onPlay = ({
  videoRef,
  setFullScreen,
}: {
  videoRef: React.RefObject<HTMLVideoElement>
  setFullScreen: (isFullScreen: boolean) => void
}) => () => {
  if (videoRef.current && isIOS) {
    const video = videoRef.current
    video.muted = false
    video.pause()
    video.currentTime = 0
    video.play()
    video.webkitEnterFullscreen()
    return
  }

  setFullScreen(true)
}

export const AboutUsHeroBlock: React.FunctionComponent<
  AboutUsHeroBlockProps
> = ({ headline, title, play_button_text }) => (
  <Background>
    <Container
      actions={actions}
      initialState={{
        isFullScreen: false,
        videoRef: React.createRef<HTMLVideoElement>(),
      }}
    >
      {({ isFullScreen, setFullScreen, videoRef }) => (
        <HeroContainer>
          <Player isFullScreen={isFullScreen} videoRef={videoRef} />
          <Shadow hidden={isFullScreen}>
            <Title
              headline={headline}
              title={title}
              playButtonText={play_button_text}
              clickedPlayButton={onPlay({ videoRef, setFullScreen })}
            />
          </Shadow>
          <CloseButton
            onClick={() => setFullScreen(false)}
            hidden={!isFullScreen}
          />
        </HeroContainer>
      )}
    </Container>
  </Background>
)
