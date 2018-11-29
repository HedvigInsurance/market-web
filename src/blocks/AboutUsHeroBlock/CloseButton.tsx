import * as React from 'react'
import styled from 'react-emotion'
import { Spring } from 'react-spring'

interface ButtonProps {
  hidden: boolean
}

const CrossIcon: React.FunctionComponent = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 29 29"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      transform="translate(1 1)"
      stroke="#FFF"
      strokeWidth=".5"
      fill="none"
      fillRule="evenodd"
    >
      <circle cx="13.5" cy="13.5" r="13.5" />
      <path
        d="M18.56 8.298l-4.703 4.703-4.703-4.703-.14.141 4.7 4.703-4.7 4.702.142.142 4.701-4.702 4.702 4.702.142-.142L14 13.142l4.701-4.703-.14-.14z"
        fillRule="nonzero"
      />
    </g>
  </svg>
)

const Button = styled('button')(
  {
    position: 'absolute',
    top: 20,
    left: 20,
    cursor: 'pointer',
    transition: 'transform 350ms',
    ':focus': {
      outline: 0,
    },
    ':active': {
      transform: 'scale(0.9)',
    },
    background: 'transparent',
    border: 0,
  },
  ({ hidden }: ButtonProps) => ({
    pointerEvents: hidden ? 'none' : 'all',
  }),
)

interface CloseButtonProps {
  onClick: () => void
  hidden: boolean
}

export const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  onClick,
  hidden,
}) => (
  <Spring
    from={{ opacity: 0 }}
    to={{
      opacity: hidden ? 0 : 1,
    }}
  >
    {(styles) => (
      <Button hidden={hidden} style={styles} onClick={onClick}>
        <CrossIcon />
      </Button>
    )}
  </Spring>
)
