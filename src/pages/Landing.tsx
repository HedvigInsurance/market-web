import * as React from 'react'
import styled from 'react-emotion'
import Helmet from 'react-helmet-async'

const LandingWrapper = styled('div')({
  backgroundColor: 'pink',
  color: 'red',
})

export const Landing: React.SFC = () => (
  <>
    <Helmet>
      <title>Landing page</title>
    </Helmet>
    <LandingWrapper>Your content goes here</LandingWrapper>
  </>
)
