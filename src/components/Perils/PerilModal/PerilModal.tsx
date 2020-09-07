import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'

import { LAPTOP_BP_UP, TABLET_BP_UP } from 'components/blockHelpers'
import { Chevron } from 'components/icons/Chevron'
import { Cross } from 'components/icons/Cross'
import { Modal, ModalProps } from 'components/Modal/Modal'
import React, { useState, useEffect } from 'react'
import { GlobalStory } from 'storyblok/StoryContainer'
import { Peril } from '../types'

const TRANSITION_MS = 250

interface PerilModalProps {
  perils: ReadonlyArray<Peril>
  currentPerilIndex: number
  setCurrentPeril: (perilIndex: number) => void
  story?: GlobalStory
}

const ModalWrapper = styled('div')`
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
  display: block;
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
  const [actionsAllowed, setActionsAllowed] = useState(true)
  useEffect(() => {
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
          <Description>{currentPeril.description}</Description>
          <CoverageWrapper>
            <CoverageList>
              <CoverageListTitle>
                {props.story?.content.peril_modal_coverage_title ?? 'Coverage'}
              </CoverageListTitle>
              {currentPeril.covered.map((text) => (
                <CoverageListItem key={text}>
                  <Cross size="0.75rem" />
                  {text}
                </CoverageListItem>
              ))}
            </CoverageList>
          </CoverageWrapper>
        </Content>
      </ModalWrapper>
    </Modal>
  )
}
