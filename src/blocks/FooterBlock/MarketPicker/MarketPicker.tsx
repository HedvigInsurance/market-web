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
} from 'utils/CurrentLocale'
import { MarketOption } from './MarketOption'
import { MarketValueContainer } from './MarketValueContainer'

const MarketSelect = styled(Select)`
  ${MOBILE_BP_UP} {
    max-width: 15rem;
  }
`

interface MarketPickerProps {
  currentLocale: LocaleData
}

export interface MarketSelectOption {
  label: string
  value: string
}

const getLocalesWithoutCurrent = (
  locales: LocaleData[],
  currentMarket: string,
) => {
  return locales.filter((locale) => locale.marketName !== currentMarket)
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLocale,
}) => {
  const currentMarket = currentLocale.marketName
  const marketsInLocalLang = getMarketsInLocalLang(locales)
  const marketsInLocalLangExceptCurrent = getLocalesWithoutCurrent(
    marketsInLocalLang,
    currentMarket,
  )
  const marketsInEnglish = getMarketsInEnglish(locales)
  const marketsInEnglishExceptCurrent = getLocalesWithoutCurrent(
    marketsInEnglish,
    currentMarket,
  )
  const markets = checkIsInEnglish(currentLocale)
    ? marketsInEnglishExceptCurrent
    : marketsInLocalLangExceptCurrent

  return (
    <MarketSelect
      color="standard-inverse"
      components={{
        Option: MarketOption,
        ValueContainer: MarketValueContainer,
      }}
      defaultValue={{
        label: currentMarket,
        value: currentLocale.marketLabel,
      }}
      options={markets.map(({ marketName, label }) => ({
        label: marketName,
        value: label,
      }))}
    />
  )
}
