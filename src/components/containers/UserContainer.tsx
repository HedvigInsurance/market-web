import { Container } from 'constate'
import React from 'react'
import { User } from '../../server/utils/teamtailor'

interface State {
  users: ReadonlyArray<User>
}

export const UserContainer: React.FunctionComponent<{
  children: (state: State) => React.ReactNode
}> = ({ children }) => (
  <Container<State> context="teamtailorUsers">{children}</Container>
)
