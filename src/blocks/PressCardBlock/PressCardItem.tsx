import styled from '@emotion/styled'
import * as React from 'react'

import { colors } from '@hedviginsurance/brand'
import { PressCardItemProps } from '.'
import { DeferredImage } from '../../components/DeferredImage'
import { getStoryblokImage } from '../../utils/storyblok'

const PressItemWrapper = styled('div')<{ offWhite?: boolean }>(
  ({ offWhite = false }) => ({
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

const Logo = styled(DeferredImage)({
  height: '2rem',
  marginTop: '10px',
  objectFit: 'contain',
})

const Text = styled('span')({
  fontSize: 18,
  lineHeight: 1.3,
  marginTop: 5,
  textAlign: 'center',
  color: colors.OFF_BLACK_DARK,
})

export const PressCardItem: React.FunctionComponent<PressCardItemProps> = ({
  logo,
  quote,
  blockColor,
}) => (
  <PressItemWrapper offWhite={blockColor?.color === 'standard'}>
    <Text>{quote}</Text>
    <Logo src={getStoryblokImage(logo)} />
  </PressItemWrapper>
)
