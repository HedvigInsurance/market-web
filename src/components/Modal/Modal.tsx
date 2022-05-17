import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { TABLET_BP_UP } from '../blockHelpers'
import { Cross } from '../icons/Cross'

export type ModalProps = {
  isVisible: boolean
  dynamicHeight?: boolean
  maxWidth?: string | number
  onClose: () => void
}

const Wrapper = styled('div')<{ isVisible: boolean }>`
  position: fixed;
  width: 100%;
  height: ${(props) => (props.isVisible ? '100%' : 0)};
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 3000;
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 350ms cubic-bezier(0.4, 0, 0.2, 1);
`

const Background = styled('div')`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(25, 25, 25, 0.4);
`

type ModalContainerProps = Omit<ModalProps, 'onClose'>

const ModalContainer = styled.div<ModalContainerProps>`
  width: 100%;
  height: 100%;
  background: ${colorsV3.gray100};
  border-radius: 1rem;
  position: absolute;
  left: 50%;
  top: 50%;
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  overflow-x: scroll;
  transition: opacity 350ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 350ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) =>
    props.isVisible
      ? 'translateX(-50%) translateY(-50%) scale(1)'
      : 'translateX(-50%) translateY(30%) scale(0.9)'};

  @media (min-width: 600px) {
    width: calc(100% - 2rem);
    max-height: ${({ dynamicHeight }) =>
      !dynamicHeight ? '42rem' : undefined};
    height: ${({ dynamicHeight }) => (dynamicHeight ? 'auto' : undefined)};
  }

  ${TABLET_BP_UP} {
    width: auto;

    ${({ maxWidth }) =>
      maxWidth &&
      css`
        width: calc(100% - 2rem);
        max-width: ${maxWidth};
      `}
  }
`

const ModalInnerContainer = styled('div')`
  width: 100%;
  height: 100%;
`

const CloseButton = styled('button')`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 0.75rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${colorsV3.gray900};
  background-color: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV3.gray700};
  }

  svg {
    transform: rotate(45deg);
  }
`

export const Modal: React.FC<ModalProps> = ({
  children,
  dynamicHeight,
  isVisible,
  maxWidth,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [handleClick])

  if (typeof window !== 'object') {
    return null
  }

  return createPortal(
    <Wrapper isVisible={isVisible}>
      <Background>
        <ModalContainer
          dynamicHeight={dynamicHeight}
          isVisible={isVisible}
          maxWidth={maxWidth}
        >
          <ModalInnerContainer ref={containerRef}>
            {children}
          </ModalInnerContainer>
          <CloseButton onClick={onClose}>
            <Cross size="1rem" />
          </CloseButton>
        </ModalContainer>
      </Background>
    </Wrapper>,
    document.body,
  )
}
