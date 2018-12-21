import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { LazyLottie } from '../components/LazyLottie'
import { GlobalStoryContainer } from '../storyblok/StoryContainer'

const Title = styled('h1')({
  textAlign: 'center',
})
const AnimationContainer = styled('div')({
  maxWidth: '20rem',
  height: '20rem',
  margin: '0 auto',
})

export const FourOhFourBlock: React.FunctionComponent = () => (
  <GlobalStoryContainer>
    {({ globalStory }) => (
      <SectionWrapper>
        <ContentWrapper>
          <Title>
            {(() => {
              switch (globalStory.lang) {
                case 'en':
                  return "Oops! There's nothing here."

                default:
                  return 'Oj! Här fanns inget.'
              }
            })()}
          </Title>
          <AnimationContainer>
            <LazyLottie
              options={{
                animationData: import(/* webpackChunkName: "sad-hedvig" */ 'animations/sadHedvig.json'),
                autoplay: true,
                loop: false,
              }}
            />
          </AnimationContainer>
        </ContentWrapper>
      </SectionWrapper>
    )}
  </GlobalStoryContainer>
)
