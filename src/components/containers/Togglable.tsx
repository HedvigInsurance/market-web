import { Container } from 'constate'
import * as React from 'react'
import { TOGGLE_TRANSITION_TIME } from '../../blocks/HeaderBlock'

export interface TogglableEffects {
  toggleOpen: () => void
}

export interface TogglableState {
  isOpen: boolean
  isClosing: boolean
}

export interface TogglableProps {
  children: (props: TogglableState & TogglableEffects) => React.ReactNode
}

export const Togglable: React.FunctionComponent<TogglableProps> = ({
  children,
}) => (
  <Container<TogglableState, {}, {}, TogglableEffects>
    initialState={{ isOpen: false, isClosing: false }}
    effects={{
      toggleOpen: () => ({ setState, state }) => {
        if (state.isClosing) {
          return
        }

        if (state.isOpen) {
          setState({ isClosing: true, isOpen: false })
          setTimeout(
            () => setState({ isClosing: false }),
            TOGGLE_TRANSITION_TIME,
          )
          return
        }

        setState({ isOpen: true })
      },
    }}
  >
    {children}
  </Container>
)
