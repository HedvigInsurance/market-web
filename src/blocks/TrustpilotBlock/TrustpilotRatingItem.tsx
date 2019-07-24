import * as React from 'react'
import StarRatings from 'react-star-ratings'

import { TrustpilotRatingItemProps } from '.'
import { getColorStyles } from '../../components/blockHelpers'

export const TrustpilotRatingItem: React.FunctionComponent<
  TrustpilotRatingItemProps
> = ({ color, title, rating }) => (
  <>
    <h4>{title}</h4>
    <StarRatings
      rating={Number(rating)}
      starRatedColor={getColorStyles(color && color.color).background}
      starEmptyColor="rgba(255, 255, 255, 0.2)"
      starDimension="25px"
      starSpacing="4px"
      numberOfStars={5}
    />
  </>
)
