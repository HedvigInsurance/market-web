import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
// @ts-ignore
import SwipeableViews from '@hedviginsurance/react-swipeable-views'
import * as React from 'react'
import MediaQuery from 'react-responsive'
import { User } from '../../../server/utils/teamtailor'

export interface MobileProps {
  teamtailorUsers: ReadonlyArray<User>
  title: string
}

const Box = styled('div')({
  padding: '20px 0',
})

const Card = styled('div')({
  margin: '1.25rem',
  boxShadow: '0px 0 10px rgba(0,0,0,0.14)',
  borderRadius: 5,
  overflow: 'hidden',
  flex: 1,
})

const ImageContainer = styled('div')({
  position: 'relative',
  overflow: 'hidden',
  height: '13rem',
  width: '100%',
})

const Image = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
})

const UserInfo = styled('div')({
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.25rem',
  userSelect: 'none',
})

const CardName = styled('span')({
  fontSize: '1rem',
  fontFamily: fonts.GEOMANIST,
})

const CardTitle = styled('span')({
  fontSize: '0.9rem',
})

const Title = styled('h3')({
  fontSize: '2.5rem',
  lineHeight: '1.1rem',
  padding: '1rem 3rem',
  textAlign: 'center',
  '@media (min-width: 700px)': {
    textAlign: 'left',
  },
})

export const Mobile: React.FunctionComponent<MobileProps> = ({
  title,
  teamtailorUsers,
}) => {
  const cards = teamtailorUsers.map((user) => (
    <Card key={user.name}>
      <ImageContainer>
        <Image src={user.picture.large!} />
      </ImageContainer>
      <UserInfo>
        <CardName>{user.name}</CardName>
        <CardTitle>{user.title}</CardTitle>
      </UserInfo>
    </Card>
  ))

  return (
    <Box>
      <Title>{title}</Title>
      <MediaQuery query="(max-width: 700px)">
        <SwipeableViews
          resistance
          enableMouseEvents
          style={{ padding: '0 15%' }}
          slideStyle={{ display: 'flex' }}
        >
          {cards}
        </SwipeableViews>
      </MediaQuery>
      <MediaQuery query="(min-width: 700px)">
        <SwipeableViews
          resistance
          slideCount={cards.length / 2}
          enableMouseEvents
          style={{ padding: '0 5%' }}
          slideStyle={{ width: '50%', display: 'flex' }}
        >
          {cards}
        </SwipeableViews>
      </MediaQuery>
    </Box>
  )
}
