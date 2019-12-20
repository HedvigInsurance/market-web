import styled from '@emotion/styled'
import { Container } from 'constate'
import * as React from 'react'
import ReactLottie from 'react-lottie'
import VisibilitySensor from 'react-visibility-sensor'
import {
  CONTENT_GUTTER,
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { LazyLottie } from '../components/LazyLottie'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const AnimatedCtaWrapper = styled('div')({
  display: 'flex',
  textAlign: 'center',
  flexWrap: 'wrap',
  minWidth: '100%',
})

const AnimatedCta = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginRight: 'auto',
  textAlign: 'center',
  width: `calc(33.333333% - 1.333333333rem)`,
  '&:not(:nth-of-type(3n))': {
    marginRight: CONTENT_GUTTER,
  },
  [TABLET_BP_DOWN]: {
    width: 'calc(50% - 1rem)',
    '&:not(:nth-of-type(3n))': {
      marginRight: 0,
    },
    '&:not(:nth-of-type(2n))': {
      marginRight: CONTENT_GUTTER,
    },
  },
  [MOBILE_BP_DOWN]: {
    width: '100%',
    '&:not(:nth-of-type(2n))': {
      marginRight: 0,
    },
  },
})

const SectionTitle = styled('h2')({
  fontSize: '3.75rem',
  width: '100%',
  [TABLET_BP_DOWN]: {
    fontSize: '2.25rem',
    marginTop: '3rem',
  },
})

const AnimatedCtaHead = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '13.125rem',
  marginLeft: 'auto',
  marginRight: 'auto',
})

const AnimatedCtaBody = styled('div')()

const AnimatedCtaTitle = styled('h3')({
  fontSize: '1.375rem',
  margin: 0,
})

const AnimatedCtaParagraph = styled('div')({
  fontSize: '1.125rem',
  wordBreak: 'break-word',
})

interface AnimatedCtaBlockProps extends BaseBlockProps {
  title: string
  bullet_points: ReadonlyArray<
    BaseBlockProps & {
      animation_type:
        | 'progressiveSuccess'
        | 'smallMobileChat'
        | 'bellNotification'
      title: string
      paragraph: MarkdownHtmlComponent
    }
  >
}

interface AnimationMapProps {
  progressiveSuccess: any
  smallMobileChat: any
  bellNotification: any
}

const animationMap: AnimationMapProps = {
  progressiveSuccess: () =>
    import(
      /* webpackChunkName: "progressive-success-animation" */ 'animations/progressiveSuccess.json'
    ),
  smallMobileChat: () =>
    import(
      /* webpackChunkName: "small-mobile-chat-animation" */ 'animations/smallMobileChat.json'
    ),
  bellNotification: () =>
    import(
      /* webpackChunkName: "bell-notification-animation" */ 'animations/bellNotification.json'
    ),
}

export const AnimatedCtaBlock: React.FunctionComponent<AnimatedCtaBlockProps> = ({
  extra_styling,
  color,
  title,
  bullet_points,
}) => (
  <SectionWrapper color={color && color.color} extraStyling={extra_styling}>
    <ContentWrapper>
      <AnimatedCtaWrapper>
        <SectionTitle>{title}</SectionTitle>
        {bullet_points.map((bullet) => (
          <AnimatedCta key={bullet._uid}>
            <Container<
              { lottieRef: React.RefObject<typeof ReactLottie> },
              {},
              {},
              { play: () => void }
            >
              initialState={{ lottieRef: React.createRef() }}
              effects={{
                play: () => ({ state }) => {
                  if (state.lottieRef.current) {
                    ;(state.lottieRef.current as any).stop()
                    ;(state.lottieRef.current as any).play()
                  }
                },
              }}
            >
              {({ lottieRef, play }) => (
                <VisibilitySensor
                  onChange={(isVisible) => {
                    if (isVisible) {
                      play()
                    }
                  }}
                >
                  {() => (
                    <AnimatedCtaHead>
                      {bullet.animation_type && (
                        <LazyLottie
                          options={{
                            animationData: animationMap[
                              bullet.animation_type
                            ](),
                            autoplay: false,
                            loop: bullet.animation_type === 'smallMobileChat',
                          }}
                          innerRef={lottieRef}
                        />
                      )}
                    </AnimatedCtaHead>
                  )}
                </VisibilitySensor>
              )}
            </Container>
            <AnimatedCtaBody>
              <AnimatedCtaTitle>{bullet.title}</AnimatedCtaTitle>
              <AnimatedCtaParagraph
                dangerouslySetInnerHTML={{
                  __html: bullet.paragraph && bullet.paragraph.html,
                }}
              />
            </AnimatedCtaBody>
          </AnimatedCta>
        ))}
      </AnimatedCtaWrapper>
    </ContentWrapper>
  </SectionWrapper>
)
