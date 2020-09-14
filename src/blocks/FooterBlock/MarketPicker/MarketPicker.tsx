import styled from '@emotion/styled'
import React from 'react'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import { Select } from 'components/Select/Select'
import { getCurrentMarket, getMarketLabel } from 'utils/CurrentLocale'
import { MarketOption } from './MarketOption'
import { MarketValueContainer } from './MarketValueContainer'

const MarketSelect = styled(Select)`
  ${MOBILE_BP_UP} {
    max-width: 15rem;
  }
`

interface MarketPickerProps {
  currentLocale: string
}

export interface MarketSelectOption {
  label: string
  value: string
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLocale,
}) => {
  const marketLabel = getMarketLabel(currentLocale)
  const activeMarket = getCurrentMarket(currentLocale)
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
