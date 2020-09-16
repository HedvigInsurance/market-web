import styled from '@emotion/styled'
import React from 'react'
import { Claims } from 'components/illustrations/Claims'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'
import {
  ContentWrapper,
  LAPTOP_BP_UP,
  MOBILE_BP_UP,
  SectionWrapper,
  TABLET_BP_UP,
} from '../components/blockHelpers'

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;

  ${MOBILE_BP_UP} {
    font-size: 3rem;
  }

  ${LAPTOP_BP_UP} {
    font-size: 4rem;
  }
`

const IllustrationWrapper = styled.div`
  max-width: 490px;
  width: 80%;
  margin: 6rem auto 2rem;
  padding-left: 1rem;
  padding-right: 1rem;

  ${MOBILE_BP_UP} {
    width: 70%;
    margin-bottom: 3rem;
  }

  ${TABLET_BP_UP} {
    margin-top: 15vh;
  }

  ${LAPTOP_BP_UP} {
    margin-bottom: 4.5rem;
    font-size: 4rem;
  }
`
const Illustration = styled.div`
  position: relative;
  height: 0;
  padding-top: 81%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const FourOhFourBlock: React.FunctionComponent = () => (
  <SectionWrapper
    colorComponent={{
      _uid: '404',
      color: 'standard-inverse',
      plugin: 'hedvig_minimal_color_picker',
    }}
  >
    <ContentWrapper>
      <IllustrationWrapper>
        <Illustration>
          <Claims />
        </Illustration>
      </IllustrationWrapper>
      <GlobalStoryContainer>
        {({ globalStory }) => {
          return <Title>{globalStory.content.four_oh_four_title}</Title>
        }}
      </GlobalStoryContainer>
    </ContentWrapper>
  </SectionWrapper>
)
