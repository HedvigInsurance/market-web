import styled from '@emotion/styled'
import SwipeableViews from '@hedviginsurance/react-swipeable-views'
import React from 'react'

import MediaQuery from 'react-responsive'
import {
  CONTENT_MAX_WIDTH_DEPRECATED,
  SectionWrapper,
} from '../../components/blockHelpers'
import { Image } from '../../utils/storyblok'
import { BaseBlockProps, ColorComponent } from '../BaseBlockProps'
import { PressCardItem } from './PressCardItem'

const Wrapper = styled('div')({
  ...CONTENT_MAX_WIDTH_DEPRECATED,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'center',
})

const Swiper = styled(SwipeableViews)({
  padding: '0 15%',

  'min-width: 900px': {
    padding: '0 5%',
  },
})

export interface PressCardItemProps {
  _uid: string
  quote: string
  logo: Image
  blockColor?: ColorComponent
}

interface PressBlockProps extends BaseBlockProps {
  cards: ReadonlyArray<PressCardItemProps>
}

export const PressCardBlock: React.FunctionComponent<PressBlockProps> = ({
  cards,
  color,
}) => (
  <SectionWrapper colorComponent={color} size="sm">
    <Wrapper id="press_card">
      <MediaQuery query="(max-width: 700px)">
        <Swiper resistance enableMouseEvents slideStyle={{ display: 'flex' }}>
          {cards.map((card) => (
            <PressCardItem blockColor={color} key={card._uid} {...card} />
          ))}
        </Swiper>
      </MediaQuery>
      <MediaQuery query="(min-width: 701px) and (max-width: 900px)">
        <Swiper
          resistance
          enableMouseEvents
          slideStyle={{ display: 'flex', width: '50%' }}
        >
          {cards.map((card) => (
            <PressCardItem blockColor={color} key={card._uid} {...card} />
          ))}
        </Swiper>
      </MediaQuery>
      <MediaQuery query="(min-width: 901px)">
        {cards.map((card) => (
          <PressCardItem blockColor={color} key={card._uid} {...card} />
        ))}
      </MediaQuery>
    </Wrapper>
  </SectionWrapper>
)
