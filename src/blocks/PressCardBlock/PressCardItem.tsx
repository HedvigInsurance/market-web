import * as React from 'react'
import styled from 'react-emotion'

import { colors } from '@hedviginsurance/brand'
import { PressCardItemProps } from '.'
import { MOBILE_BP_DOWN } from '../../components/blockHelpers'
import { DeferredImage } from '../../components/DeferredImage'
import { getStoryblokImage } from '../../utils/storyblok'

const PressItemContainer = styled('div')({
  borderRadius: 8,
  padding: 24,
  margin: '0 20px',
  maxWidth: 330,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
})

const Logo = styled(DeferredImage)({
  width: 80,
  height: 80,
  objectFit: 'contain',
  [MOBILE_BP_DOWN]: {
    width: 80,
    height: 80,
  },
})

const Text = styled('span')({
  fontSize: 18,
  lineHeight: '24px',
  marginTop: 5,
  textAlign: 'center',
  color: colors.OFF_BLACK_DARK,
})

export const PressCardItem: React.FunctionComponent<PressCardItemProps> = ({
  logo,
  quote,
}) => (
  <PressItemContainer>
    <Text>“{quote}”</Text>
    <Logo src={getStoryblokImage(logo)} />
  </PressItemContainer>
)
