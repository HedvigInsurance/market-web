import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'

import { LAPTOP_BP_UP, TABLET_BP_UP } from 'components/blockHelpers'
import { Chevron } from 'components/icons/Chevron'
import { Cross } from 'components/icons/Cross'
import { Minus } from 'components/icons/Minus'
import { Modal, ModalProps } from 'components/Modal/Modal'
import React from 'react'
import { Peril } from '../types'

const TRANSITION_MS = 250

interface PerilModalProps {
  perils: ReadonlyArray<Peril>
  currentPerilIndex: number
  setCurrentPeril: (perilIndex: number) => void
}

const ModalWrapper = styled('div')`
  font-family: ${fonts.FAVORIT};
  padding: 5rem 1rem 3rem;

  @media (min-width: 400px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  ${LAPTOP_BP_UP} {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`

const Header = styled('div')`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  ${TABLET_BP_UP} {
    width: 46%;
    margin-bottom: 4rem;
  }
`

const Title = styled.div`
  font-size: 1.5rem;
  line-height: 1.2;
  color: ${colorsV3.gray900};

  @media (min-width: 400px) {
    font-size: 2rem;
  }

  ${TABLET_BP_UP} {
    font-size: 3rem;
  }
`

const DirectionButton = styled('button')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;
  border: 1px solid currentColor;
  border-radius: 0.5rem;

  svg {
    transition: all 0.15s ease-in-out;
    fill: ${colorsV3.gray900};
  }
  :focus {
    outline: none;
  }
`

const Content = styled('div')`
  ${TABLET_BP_UP} {
    display: flex;
    justify-content: space-between;
  }
`
const Column = styled('div')`
  ${TABLET_BP_UP} {
    width: 46%;

    &:last-of-type {
      width: 48%;
    }
  }
`

const Description = styled.div`
  margin-bottom: 3rem;
  font-size: 1rem;
  line-height: 1.33;
  color: ${colorsV3.gray900};

  @media (max-width: 600px) {
    font-size: 1.125rem;
  }
`
const InfoBox = styled.div`
  margin-bottom: 2.5rem;
  padding: 3rem 2.5rem;
  color: ${colorsV3.gray100};
  border-radius: 8px;
  background-color: ${colorsV3.gray900};

  ${TABLET_BP_UP} {
    margin-bottom: 0;
  }
`

const InfoBoxTitle = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`

const InfoBoxBody = styled.div`
  font-size: 0.875rem;
  line-height: 1.45;
`

const CoverageWrapper = styled.div`
  @media (min-width: 600px) {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  ${TABLET_BP_UP} {
    flex-direction: column;
  }
`

const CoverageList = styled.div`
  width: 100%;
  margin-bottom: 2rem;

  @media (min-width: 600px) {
    width: 50%;
  }

  ${TABLET_BP_UP} {
    width: 100%;
  }
`

const CoverageListTitle = styled.div`
  font-size: 1.5rem;
  color: ${colorsV3.gray900};
  margin-bottom: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${colorsV3.gray900};
`

const CoverageListItem = styled.div`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${colorsV3.gray900};
  padding-left: 2rem;
  position: relative;
  margin-bottom: 1rem;

  svg {
    position: absolute;
    left: 0;
    top: 0.25rem;
  }
`

export const PerilModal: React.FC<PerilModalProps & ModalProps> = (props) => {
  const [actionsAllowed, setActionsAllowed] = React.useState(true)

  React.useEffect(() => {
    const isBelowBoundary = props.currentPerilIndex < props.perils.length
    const isAboveBoundary = props.currentPerilIndex > props.perils.length * 2

    if (isBelowBoundary || isAboveBoundary) {
      setTimeout(() => {
        props.setCurrentPeril(
          props.currentPerilIndex +
            (isBelowBoundary ? 1 : -1) * props.perils.length,
        )
      }, TRANSITION_MS)
    }

    setActionsAllowed(false)

    setTimeout(() => {
      setActionsAllowed(true)
    }, TRANSITION_MS * 2)
  }, [props.currentPerilIndex])

  const currentPeril =
    props.perils[props.currentPerilIndex % props.perils.length]

  return (
    <Modal isVisible={props.isVisible} onClose={props.onClose}>
      <ModalWrapper>
        <Header>
          <DirectionButton
            onClick={() =>
              actionsAllowed &&
              props.setCurrentPeril(props.currentPerilIndex - 1)
            }
          >
            <Chevron direction="left" />
          </DirectionButton>
          <Title>{currentPeril.title}</Title>

          <DirectionButton
            onClick={() =>
              actionsAllowed &&
              props.setCurrentPeril(props.currentPerilIndex + 1)
            }
          >
            <Chevron direction="right" />
          </DirectionButton>
        </Header>
        <Content>
          <Column>
            <Description>{currentPeril.description}</Description>
            {currentPeril.info && (
              <InfoBox>
                <InfoBoxTitle>{'PLACEHOLDER'}</InfoBoxTitle>
                <InfoBoxBody>{currentPeril.info}</InfoBoxBody>
              </InfoBox>
            )}
          </Column>
          <Column>
            <CoverageWrapper>
              <CoverageList>
                <CoverageListTitle>{'PLACEHOLDER'}</CoverageListTitle>
                {currentPeril.covered.map((text) => (
                  <CoverageListItem key={text}>
                    <Cross size="0.75rem" />
                    {text}
                  </CoverageListItem>
                ))}
              </CoverageList>

              {currentPeril.exceptions.length > 0 && (
                <CoverageList>
                  <CoverageListTitle>{'PLACEHOLDER'}</CoverageListTitle>
                  {currentPeril.exceptions.map((text) => (
                    <CoverageListItem key={text}>
                      <Minus size="0.75rem" />
                      {text}
                    </CoverageListItem>
                  ))}
                </CoverageList>
              )}
            </CoverageWrapper>
          </Column>
        </Content>
      </ModalWrapper>
    </Modal>
  )
}
