import styled from '@emotion/styled'
import { ActionMap, Container } from 'constate'
import * as React from 'react'
import { ContentWrapper } from '../../../components/blockHelpers'
import { User } from '../../../server/utils/teamtailor'
import { List } from './List'
import { SelectedUser } from './SelectedUser'

const Background = styled('div')({
  backgroundColor: '#F9FAFC',
  padding: '4rem 0',
})

const Box = styled('div')({
  display: 'flex',
  backgroundColor: 'white',
  borderRadius: 5,
  boxShadow: '-1px 0 10px rgba(0,0,0,0.14)',
  overflow: 'hidden',
})

export interface DesktopProps {
  teamtailorUsers: ReadonlyArray<User>
  title: string
}

interface State {
  selectedUser: User
  users: ReadonlyArray<User>
}

interface Actions {
  setSelectedUser: (selectedUser: User) => void
}

const actions: ActionMap<State, Actions> = {
  setSelectedUser: (selectedUser) => () => ({
    selectedUser,
  }),
}

export const Desktop: React.FunctionComponent<DesktopProps> = ({
  title,
  teamtailorUsers,
}) => (
  <Background>
    <Container
      actions={actions}
      initialState={{
        selectedUser: teamtailorUsers[0],
        users: teamtailorUsers.filter((user) => user.picture),
      }}
    >
      {({ selectedUser, users, setSelectedUser }) => (
        <ContentWrapper>
          <Box>
            <List
              title={title}
              users={users}
              onSelect={setSelectedUser}
              selectedUser={selectedUser}
            />
            <SelectedUser users={users} selectedUser={selectedUser} />
          </Box>
        </ContentWrapper>
      )}
    </Container>
  </Background>
)
