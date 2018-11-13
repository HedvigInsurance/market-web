import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'
import { StoryContainer } from '../storyblok/StoryContainer'

const LandingWrapper = styled('div')({
  backgroundColor: 'pink',
  color: 'red',
})

export const Landing: React.FunctionComponent = () => (
  <StoryContainer>
    {({ story }) => (
      <>
        <Helmet>
          <title>{story.name}</title>
          {typeof window === 'undefined' && (
            <link
              rel="canonical"
              href={`${process.env.HOST}/${story.full_slug.replace(
                /\/?home$/,
                '',
              )}`}
            />
          )}
        </Helmet>
        <LandingWrapper>Your content goes here</LandingWrapper>
      </>
    )}
  </StoryContainer>
)
