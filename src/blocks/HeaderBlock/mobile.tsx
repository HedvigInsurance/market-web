import styled from 'react-emotion'
import * as React from 'react'

export const MOBILE_BP_DOWN = '@media (max-width: 480px)'
export const MOBILE_BP_UP = '@media (min-width: 481px)'

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
  position: 'relative',
  marginLeft: 'auto',
  appearance: 'none',
  background: 'transparent',
  border: '0',
  color: 'inherit',
  width: '2rem',
  height: '1.5rem',

  [MOBILE_BP_UP]: {
    display: 'none',
  },

  '&:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
})

export const Burger: React.FunctionComponent<
  MobileVisibility & React.HTMLAttributes<HTMLButtonElement>
> = ({ isOpen, isClosing, ...rest }) => (
  <NavToggle {...rest}>
    <CrossBurger isOpen={isOpen} isClosing={isClosing} />
    <MiddleBurger isOpen={isOpen} isClosing={isClosing} />
  </NavToggle>
)
