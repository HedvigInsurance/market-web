import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import * as React from 'react'

import { PressItemProps } from '.'
import { MOBILE_BP_DOWN } from '../../components/blockHelpers'
import { DeferredImage } from '../../components/DeferredImage'
import { getStoryblokImage } from '../../utils/storyblok'

const Link = styled('a')({
  textDecoration: 'none',
})

const PressItemContainer = styled('div')({
  borderRadius: 5,
  boxShadow: '-1px 0 10px rgba(0,0,0,0.14)',
  padding: 20,
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white',
})

const Logo = styled(DeferredImage)({
  width: 75,
  height: 75,
  objectFit: 'contain',
  [MOBILE_BP_DOWN]: {
    width: 50,
    height: 50,
  },
})

const Content = styled('div')({
  paddingLeft: 20,
  display: 'flex',
  flexDirection: 'column',
})

const Title = styled('span')({
  fontSize: 20,
  lineHeight: '21px',
  fontFamily: fonts.GEOMANIST,
})

const Text = styled('span')({
  fontSize: 14,
  lineHeight: '16px',
  marginTop: 5,
})

export const PressItem: React.FunctionComponent<PressItemProps> = ({
  logo,
  link,
  title,
  text,
}) => (
  <Link href={link}>
    <PressItemContainer>
      <Logo src={getStoryblokImage(logo)} />
      <Content>
        <Title>{title}</Title>
        <Text>{text}</Text>
      </Content>
    </PressItemContainer>
  </Link>
)
