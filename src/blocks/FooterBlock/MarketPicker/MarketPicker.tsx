import styled from '@emotion/styled'
import React from 'react'
import { Select } from 'components/Select/Select'
import { MarketOption } from './MarketOption'
import { getMarketLabel, getCurrentMarket } from 'utils/CurrentLocale'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import { MarketValueContainer } from './MarketValueContainer'

const MarketSelect = styled(Select)`
  ${MOBILE_BP_UP} {
    max-width: 15rem;
  }
`

type MarketPickerProps = {
  currentLanguage: string
}

export type MarketSelectOption = {
  label: string
  value: string
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLanguage,
}) => {
  const marketLabel = getMarketLabel(currentLanguage)
  const activeMarket = getCurrentMarket(currentLanguage)
  return (
    <MarketSelect
      color="standard-inverse"
      components={{
        Option: MarketOption,
        ValueContainer: MarketValueContainer,
      }}
      defaultValue={{ label: marketLabel[activeMarket], value: activeMarket }}
      options={[
        { label: marketLabel.se, value: 'se' },
        { label: marketLabel.no, value: 'no' },
      ]}
    />
  )
}
