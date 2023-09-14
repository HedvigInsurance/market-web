import styled from '@emotion/styled'
import React from 'react'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'
import {
  ContentWrapper,
  LAPTOP_BP_UP,
  MOBILE_BP_UP,
  SectionWrapper,
} from '../components/blockHelpers'

export const FourOhFourBlock: React.FunctionComponent = () => (
  <SectionWrapper
    colorComponent={{
      _uid: '404',
      color: 'standard-inverse',
      plugin: 'hedvig_minimal_color_picker',
    }}
  >
    <StyledContentWrapper>
      <GlobalStoryContainer>
        {({ globalStory }) => (
          <Title>{globalStory.content.four_oh_four_title}</Title>
        )}
      </GlobalStoryContainer>
    </StyledContentWrapper>
  </SectionWrapper>
)

const StyledContentWrapper = styled(ContentWrapper)`
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h1`
  font-size: 2rem;

  ${MOBILE_BP_UP} {
    font-size: 3rem;
  }

  ${LAPTOP_BP_UP} {
    font-size: 4rem;
  }
`
