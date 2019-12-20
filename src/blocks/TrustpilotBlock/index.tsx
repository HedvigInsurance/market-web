import styled from '@emotion/styled'
import SwipeableViews from '@hedviginsurance/react-swipeable-views'
import * as React from 'react'

import MediaQuery from 'react-responsive'
import {
  CONTENT_MAX_WIDTH,
  ContentWrapper,
  getColorStyles,
  SectionWrapper,
} from '../../components/blockHelpers'
import { BaseBlockProps, ColorComponent } from '../BaseBlockProps'
import { TrustpilotCardItem } from './TrustpilotCardItem'
import { TrustpilotRatingItem } from './TrustpilotRatingItem'

const CardWrapper = styled('div')({
  ...CONTENT_MAX_WIDTH,
  margin: '0 auto',
  paddingBottom: '2rem',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
})

const RatingsWrapper = styled('div')({
  marginBottom: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const Swiper = styled(SwipeableViews)({
  width: '100%',
})

const TrustpilotWrapper = styled(SectionWrapper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const Title = styled('h2')<{ color: string }>(({ color }) => ({
  color,
  margin: 0,
}))

export interface TrustpilotRatingItemProps {
  _uid: string
  color: ColorComponent
  title: string
  rating: string
}

export interface TrustpilotCardItemProps {
  _uid: string
  quote: string
  author: string
  link: string
  blockColor?: ColorComponent
}

interface TrustpilotBlockProps extends BaseBlockProps {
  title: string
  title_color?: ColorComponent
  ratings: ReadonlyArray<TrustpilotRatingItemProps>
  cards: ReadonlyArray<TrustpilotCardItemProps>
}

export const TrustpilotBlock: React.FunctionComponent<TrustpilotBlockProps> = ({
  color,
  size,
  extra_styling,
  cards,
  ratings,
  title,
  title_color,
}) => (
  <TrustpilotWrapper
    color={color && color.color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper>
      <Title
        color={
          title_color && title_color.color !== 'standard'
            ? getColorStyles(title_color.color).background
            : color
            ? getColorStyles(color.color).color
            : 'standard'
        }
      >
        {title}
      </Title>
      <RatingsWrapper>
        {ratings.map((rating) => {
          return Number(rating.rating) ? (
            <TrustpilotRatingItem key={rating._uid} {...rating} />
          ) : null
        })}
      </RatingsWrapper>
    </ContentWrapper>
    <CardWrapper id="trustpilot_cards">
      <MediaQuery query="(max-width: 700px)">
        <Swiper
          resistance
          enableMouseEvents
          slideStyle={{ display: 'flex', minWidth: '0' }}
        >
          {cards.map((card) => (
            <TrustpilotCardItem blockColor={color} key={card._uid} {...card} />
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
            <TrustpilotCardItem blockColor={color} key={card._uid} {...card} />
          ))}
        </Swiper>
      </MediaQuery>
      <MediaQuery query="(min-width: 901px)">
        {cards.map((card) => (
          <TrustpilotCardItem blockColor={color} key={card._uid} {...card} />
        ))}
      </MediaQuery>
    </CardWrapper>
  </TrustpilotWrapper>
)
