import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useState, useEffect } from 'react'

interface Hidable {
  isVisible: boolean
}

const Wrapper = styled.div<Hidable & { displayNone: boolean }>`
  display: ${({ displayNone }) => (displayNone ? 'none' : 'flex')};
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 40000;
  justify-content: center;
  transform: ${({ isVisible }) =>
    isVisible ? 'translateY(0)' : 'translateY(100%)'};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0.8)};
  transition: transform 500ms, opacity 500ms;
  box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, 0.04);
  background: ${colorsV3.gray100};
  padding: 1rem;

  @media (min-width: 601px) {
    display: none;
  }
`

type BooleanSetter = (state: boolean) => void
const avoidDisplayNoneGlitch = (
  setVisible: BooleanSetter,
  setDisplayNone: BooleanSetter,
  isVisible: boolean,
) => () => {
  if (isVisible) {
    setDisplayNone(false)
    setTimeout(() => setVisible(true), 20)
  } else {
    setVisible(false)
    setTimeout(() => {
      setDisplayNone(true)
    }, 500)
  }
}

export const StickyBottomCta: React.FC<{ isVisible: boolean }> = ({
  children,
  isVisible,
}) => {
  const [reallyIsVisible, setReallyIsVisible] = useState(false)
  const [displayNone, setDisplayNone] = useState(false)
  useEffect(
    avoidDisplayNoneGlitch(setReallyIsVisible, setDisplayNone, isVisible),
    [isVisible],
  )

  return (
    <Wrapper isVisible={reallyIsVisible} displayNone={displayNone}>
      <div>{children}</div>
    </Wrapper>
  )
}
