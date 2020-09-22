import styled from '@emotion/styled'
import React from 'react'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import { Select } from 'components/Select/Select'
import {
  getMarketsInLocalLang,
  getMarketsInEnglish,
  checkIsInEnglish,
  locales,
  LocaleData,
} from 'utils/locales'
import { MarketOption } from './MarketOption'
import { MarketValueContainer } from './MarketValueContainer'

const MarketSelect = styled(Select)`
  ${MOBILE_BP_UP} {
    max-width: 15rem;
  }
`

interface MarketPickerProps {
  currentLocale: LocaleData
  blokId: string
}

export interface MarketSelectOption {
  label: string
  value: string
}

export const sortMarketsAlphabetiacally = (markets: LocaleData[]) => {
  return markets.sort((a, b) => (a.label < b.label ? -1 : 1))
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLocale,
  blokId,
}) => {
  const currentMarket = currentLocale.marketName
  const marketsInLocalLang = getMarketsInLocalLang(locales)
  const marketsInEnglish = getMarketsInEnglish(locales)

  const markets = checkIsInEnglish(currentLocale)
    ? sortMarketsAlphabetiacally(marketsInEnglish)
    : sortMarketsAlphabetiacally(marketsInLocalLang)

  return (
    <MarketSelect
      color="standard-inverse"
      instanceId={blokId}
      isSearchable={false}
      components={{
        Option: MarketOption,
        ValueContainer: MarketValueContainer,
      }}
      value={{
        label: currentMarket,
        value: currentLocale.label,
      }}
      defaultValue={{
        label: currentMarket,
        value: currentLocale.label,
      }}
      options={markets.map(({ marketName, label }) => ({
        label: marketName,
        value: label,
      }))}
    />
  )
}
