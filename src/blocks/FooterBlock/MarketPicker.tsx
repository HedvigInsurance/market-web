// import styled from '@emotion/styled'
import React from 'react'
import { Select } from 'components/Select/Select'
import { MarketOption } from './MarketOption'
import { getMarketLabel, getCurrentMarket } from 'utils/CurrentLocale'

type MarketPickerProps = {
  currentLanguage: string
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLanguage,
}) => {
  const marketLabel = getMarketLabel(currentLanguage)
  const activeMarket = getCurrentMarket(currentLanguage)
  return (
    <Select
      color="standard-inverse"
      components={{ Option: MarketOption }}
      defaultValue={{ label: marketLabel[activeMarket], value: activeMarket }}
      options={[
        { label: marketLabel.se, value: 'se' },
        { label: marketLabel.no, value: 'no' },
      ]}
    />
  )
}
