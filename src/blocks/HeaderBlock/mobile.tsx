import * as React from 'react'
import styled, { keyframes } from 'react-emotion'
import {
  CONTENT_GUTTER,
  CONTENT_GUTTER_MOBILE,
  MOBILE_BP_DOWN,
} from '../../components/blockHelpers'
import { HEADER_VERTICAL_PADDING, TOGGLE_TRANSITION_TIME } from './index'

export const TABLET_BP_DOWN = '@media (max-width: 800px)'
export const TABLET_BP_UP = '@media (min-width: 801px)'

export interface MobileVisibility {
  isOpen: boolean
  isClosing: boolean
}

export const CrossBurger = styled('div')(
  ({ isOpen, isClosing }: MobileVisibility) => ({
    width: '100%',

    '&::before, &::after': {
      position: 'absolute',
      left: 0,
      right: 0,
      content: '" "',
      width: '100%',
      height: 3,
      backgroundColor: 'currentColor',
      transition:
        'background-color 300ms, transform 300ms, top 300ms, bottom 300ms',
    },

    '&::before': {
      top: 0,
      ...(isOpen && !isClosing
        ? {
            transform: 'translateY(-1.5px) rotate(45deg)',
            top: '50%',
            backgroundColor: 'currentColor',
          }
        : {}),
    },
    '&::after': {
      bottom: 0,
      ...(isOpen && !isClosing
        ? {
            bottom: '50%',
            transform: 'translateY(1.5px) rotate(-45deg)',
            backgroundColor: 'currentColor',
          }
        : {}),
    },
  }),
)

const MiddleBurger = styled('div')(
  ({ isOpen, isClosing }: MobileVisibility) => ({
    position: 'absolute',
    width: '100%',
    top: '50%',
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: isOpen && !isClosing ? 'transparent' : 'currentColor',
    transition: 'background-color 300ms',
    transform: 'translateY(-1.5px)',
  }),
)

export const NavToggle = styled('button')({
  display: 'block',
  position: 'absolute',
  right: CONTENT_GUTTER,
  top: HEADER_VERTICAL_PADDING,
  appearance: 'none',
  background: 'transparent',
  border: '0',
  color: 'inherit',
  width: '1.5rem',
  height: '1.5rem',
  zIndex: 102,

  [TABLET_BP_UP]: {
    display: 'none',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },

  [MOBILE_BP_DOWN]: {
    right: CONTENT_GUTTER_MOBILE,
  },
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})
const Overlay = styled('div')(({ closing }: { closing: boolean }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 99,
  backgroundColor: closing ? 'transparent' : 'rgba(0,0,0, .5)',
  transition: `background-color ${TOGGLE_TRANSITION_TIME}ms`,
  animation: `${fadeIn} ${TOGGLE_TRANSITION_TIME}ms`,
  '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',

  [TABLET_BP_UP]: {
    display: 'none',
  },
}))

export const Burger: React.FunctionComponent<
  MobileVisibility & React.HTMLAttributes<HTMLButtonElement>
> = ({ isOpen, isClosing, ...rest }) => (
  <>
    <NavToggle {...rest}>
      <CrossBurger isOpen={isOpen} isClosing={isClosing} />
      <MiddleBurger isOpen={isOpen} isClosing={isClosing} />
    </NavToggle>
    {(isOpen || isClosing) && (
      <Overlay
        onClick={
          (rest.onClick as any) as React.EventHandler<
            React.MouseEvent<HTMLDivElement>
          >
        }
        closing={isClosing}
      />
    )}
  </>
)
