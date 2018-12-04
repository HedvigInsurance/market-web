import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { User } from '../../../server/utils/teamtailor'

interface ListProps {
  users: ReadonlyArray<User>
  onSelect: (user: User) => void
  selectedUser: User
  title: string
}

const Container = styled('div')({
  padding: '2rem',
  width: '50%',
})

const Title = styled('h3')({
  fontSize: '2rem',
  fontFamily: fonts.SORAY,
  marginTop: '1.25rem',
  marginBottom: '2rem',
})

const ListContainer = styled('ul')({
  display: 'flex',
  flexWrap: 'wrap',
  padding: 0,
  margin: 0,
  marginTop: 10,
})

interface ListItemProps {
  active: boolean
}

const ListItem = styled('li')(
  {
    width: '48%',
    maxWidth: '48%',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-1px 0 10px rgba(0,0,0,0.09)',
    border: '1px solid rgba(0,0,0,0.10)',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    textAlign: 'center',
    willChange: 'color, transform, background',
    margin: '0 1% 8px 1%',
    ':active': {
      transform: 'scale(0.95)',
    },
    '@media(min-width: 1150px)': {
      width: '32.33%',
      maxWidth: '32.33%',
      marginLeft: 0,
      marginRight: 0,
      ':nth-child(3n + 2)': {
        margin: '0 1.5% 8px 1.5%',
      },
    },
  },
  ({ active }: ListItemProps) => ({
    color: active ? colors.WHITE : colors.BLACK,
    backgroundColor: active ? colors.PURPLE : colors.WHITE,
    transition: active
      ? 'color 500ms, transform 350ms 150ms, background 350ms'
      : 'color 500ms, transform 150ms, background 350ms',
  }),
)

const ListName = styled('span')({
  fontWeight: 800,
  fontSize: '.9rem',
  lineHeight: 1.1,
})

const ListTitle = styled('span')({
  marginTop: '.3rem',
  fontSize: '0.67rem',
  maxWidth: '90%',
  lineHeight: 1.4,
})

export const List: React.FunctionComponent<ListProps> = ({
  users,
  selectedUser,
  onSelect,
  title,
}) => (
  <Container>
    <Title>{title}</Title>
    <ListContainer>
      {users.map((user) => (
        <ListItem
          key={user.name}
          active={user === selectedUser}
          onClick={() => onSelect(user)}
        >
          <ListName>{user.name}</ListName>
          <ListTitle>{user.title}</ListTitle>
        </ListItem>
      ))}
    </ListContainer>
  </Container>
)
