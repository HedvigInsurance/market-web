import styled from '@emotion/styled'
import { ActionMap, Container } from 'constate'
import * as React from 'react'

import {
  CONTENT_GUTTER,
  getColorStyles,
  MOBILE_BP_DOWN,
} from '../../components/blockHelpers'
import { BaseBlockProps, ColorComponent } from '../BaseBlockProps'
import { Player } from './Player'

interface HeroVideoBlockProps extends BaseBlockProps {
  video_file_location: string
  mobile_video_file_location: string
  desktop_background_image: string
  mobile_background_image: string
  title: string
  second_title?: string
  title_color?: ColorComponent
  subtitle: string
  color?: ColorComponent
}

const HeroContainer = styled('div')({
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
})

const Title = styled('h1')<{ color: string }>(({ color }) => ({
  maxWidth: 600,
  marginBottom: 0,
  color,
  textShadow: '1px 1px 15px rgba(0, 0, 0, .3)',
}))

const Subtitle = styled('p')<{ color: string }>(({ color }) => ({
  color,
  fontSize: '1.125rem',
  textShadow: '1px 1px 15px rgba(0, 0, 0, .3)',
}))

const TitleWrapper = styled('div')({
  position: 'absolute',
  padding: '0 ' + CONTENT_GUTTER,
  left: 0,
  right: 0,
  top: 0,
  height: 'calc(90vh - 100px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  [MOBILE_BP_DOWN]: {
    justifyContent: 'flex-end',
  },
})

interface State {
  videoRef: React.RefObject<HTMLVideoElement>
  mobileVideoRef: React.RefObject<HTMLVideoElement>
}

interface Actions {
  setVideoRef: (videoRef: React.RefObject<HTMLVideoElement>) => void
  setMobileVideoRef: (videoRef: React.RefObject<HTMLVideoElement>) => void
}

const actions: ActionMap<State, Actions> = {
  setVideoRef: (videoRef) => () => ({
    videoRef,
  }),
  setMobileVideoRef: (videoRef) => () => ({
    videoRef,
  }),
}

export const HomeHeroBlock: React.FunctionComponent<HeroVideoBlockProps> = ({
  title,
  second_title,
  title_color,
  subtitle,
  color,
  video_file_location,
  mobile_video_file_location,
  desktop_background_image,
  mobile_background_image,
}) => (
  <Container
    actions={actions}
    initialState={{
      videoRef: React.createRef<HTMLVideoElement>(),
      mobileVideoRef: React.createRef<HTMLVideoElement>(),
    }}
  >
    {({ videoRef, mobileVideoRef }) => (
      <HeroContainer>
        <Player
          videoRef={videoRef}
          mobileVideoRef={mobileVideoRef}
          desktopImage={desktop_background_image}
          mobileImage={mobile_background_image}
          baseVideoUrl={video_file_location}
          baseMobileVideoUrl={mobile_video_file_location}
          backgroundColor="standard"
        />
        <TitleWrapper>
          <Title
            color={
              title_color
                ? getColorStyles(title_color.color).background
                : 'white'
            }
          >
            {title}
          </Title>
          {second_title && (
            <Title
              color={
                title_color
                  ? getColorStyles(title_color.color).background
                  : 'white'
              }
            >
              {second_title}
            </Title>
          )}
          <Subtitle color={color ? getColorStyles(color.color).color : 'white'}>
            {subtitle}
          </Subtitle>
        </TitleWrapper>
      </HeroContainer>
    )}
  </Container>
)
