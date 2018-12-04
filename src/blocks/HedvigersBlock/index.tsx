import { Container } from 'constate'
import * as React from 'react'
import { Mount } from 'react-lifecycle-components/dist'
import MediaQuery from 'react-responsive'
import { UserContainer } from '../../components/containers/UserContainer'
import { BaseBlockProps } from '../BaseBlockProps'
import { DesktopProps } from './Desktop'
import { MobileProps } from './Mobile'

interface HedvigersBlockProps extends BaseBlockProps {
  title: string
}

interface State {
  Mobile: null | React.ComponentType<MobileProps>
  Desktop: null | React.ComponentType<DesktopProps>
}

interface Actions {
  setMobile: (Mobile: React.ComponentType<MobileProps>) => void
  setDesktop: (Desktop: React.ComponentType<DesktopProps>) => void
}

export const HedvigersBlock: React.FunctionComponent<HedvigersBlockProps> = ({
  title,
}) => (
  <UserContainer>
    {({ users }) => (
      <Container<State, Actions>
        initialState={{ Mobile: null, Desktop: null }}
        actions={{
          setMobile: (Mobile) => () => ({ Mobile }),
          setDesktop: (Desktop) => () => ({ Desktop }),
        }}
      >
        {({ Mobile, Desktop, setMobile, setDesktop }) => (
          <Mount
            on={() => {
              import('./Desktop' /* webpackChunkName: "hedvigers-desktop" */).then(
                (m) => setDesktop(m.Desktop),
              )
              import('./Mobile' /* webpackChunkName: "hedvigers-mobile" */).then(
                (m) => setMobile(m.Mobile),
              )
            }}
          >
            <MediaQuery query="(max-width: 900px)">
              {Mobile && <Mobile title={title} teamtailorUsers={users} />}
            </MediaQuery>
            <MediaQuery query="(min-width: 901px)">
              {Desktop && <Desktop title={title} teamtailorUsers={users} />}
            </MediaQuery>
          </Mount>
        )}
      </Container>
    )}
  </UserContainer>
)
