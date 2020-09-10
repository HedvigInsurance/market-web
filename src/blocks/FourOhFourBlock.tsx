import styled from '@emotion/styled'
import React from 'react'
import { ContextContainer } from 'components/containers/ContextContainer'
import { Claims } from 'components/illustrations/Claims'
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
  <ContextContainer>
    {(context) => (
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
          <Title>
            {(() => {
              switch (context.lang) {
                case 'se':
                  return 'Oj! Här fanns inget.'

                case 'no':
                  return 'Ups! Her finnes ikke noe.'

                default:
                  return "Oops! There's nothing here."
              }
            })()}
          </Title>
        </ContentWrapper>
      </SectionWrapper>
    )}
  </ContextContainer>
)
