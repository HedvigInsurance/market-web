import styled from '@emotion/styled'
import * as React from 'react'
import StarRatings from 'react-star-ratings'

import { TrustpilotRatingItemProps } from '.'
import { getColorStyles } from '../../components/blockHelpers'

const Title = styled('h4')({
  textAlign: 'center',
})

export const TrustpilotRatingItem: React.FunctionComponent<TrustpilotRatingItemProps> = ({
  color,
  title,
  rating,
}) => (
  <>
    <Title>{title}</Title>
    <StarRatings
      rating={Number(rating)}
      starRatedColor={getColorStyles(color && color.color).background}
      starEmptyColor="rgba(255, 255, 255, 0.4)"
      starDimension="25px"
      starSpacing="4px"
      numberOfStars={5}
    />
  </>
)
