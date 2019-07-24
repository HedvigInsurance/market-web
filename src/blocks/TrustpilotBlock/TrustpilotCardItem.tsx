import * as React from 'react'
import styled from 'react-emotion'

import { colors } from '@hedviginsurance/brand'
import { TrustpilotCardItemProps } from '.'

const PressItemWrapper = styled('div')(
  ({ offWhite = false }: { offWhite?: boolean }) => ({
    borderRadius: 8,
    padding: 24,
    margin: '0 20px',
    maxWidth: 330,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: offWhite && offWhite ? colors.OFF_WHITE : 'white',
  }),
)

const Text = styled('span')({
  fontSize: 18,
  lineHeight: 1.3,
  marginTop: 5,
  textAlign: 'center',
  color: colors.OFF_BLACK_DARK,
})

const AuthorText = styled('span')({
  fontSize: 16,
  lineHeight: 1.2,
  marginTop: 15,
  textAlign: 'center',
  fontWeight: 'bold',
  color: colors.OFF_BLACK_DARK,
})

const Link = styled('a')({
  textDecoration: 'none',
})

export const TrustpilotCardItem: React.FunctionComponent<
  TrustpilotCardItemProps
> = ({ quote, author, link, blockColor }) => (
  <Link href={link}>
    <PressItemWrapper offWhite={blockColor && blockColor.color === 'standard'}>
      <Text>{quote}</Text>
      <AuthorText>{author}</AuthorText>
    </PressItemWrapper>
  </Link>
)
