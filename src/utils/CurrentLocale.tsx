export const getCurrentMarket = (locale: string) => {
  switch (locale) {
    case 'no':
    case 'no-en':
      return 'no'
    default:
      return 'se'
  }
}

export const getMarketLabel = (locale: string) => {
  switch (locale) {
    case 'no-en':
    case 'se-en':
      return { se: 'Sweden', no: 'Norway' }
    default:
      return { se: 'Sverige', no: 'Norge' }
  }
}

type Label = string // format: 'se' / 'no-en'
type IsoCode = string // format: 'sv_SE' / 'en_NO'
type MarketLabel = string // format: 'se' / 'no'
type MarketName = string // format: 'Sverige' / 'Norway'
type LanguageLabel = string // format: 'Sv' / 'En'
type HrefLang = string // format: 'sv-se' / 'en-no'

export type LocaleData = {
  label: Label
  iso: IsoCode
  marketLabel: MarketLabel
  marketName: MarketName
  langLabel: LanguageLabel
  hrefLang: HrefLang
  adtractionSrc?: string
}

export const locales: Record<Label, LocaleData> = {
  se: {
    label: 'se',
    iso: 'sv_SE',
    marketLabel: 'se',
    marketName: 'Sverige',
    langLabel: 'Sv',
    hrefLang: 'sv-se',
    adtractionSrc: 'https://adtr.io/jsTag?ap=1412531808',
  },
  'se-en': {
    label: 'se-en',
    iso: 'en_SE',
    marketLabel: 'se',
    marketName: 'Sweden',
    langLabel: 'En',
    hrefLang: 'en-se',
    adtractionSrc: 'https://adtr.io/jsTag?ap=1412531808',
  },
  no: {
    label: 'no',
    iso: 'nb_NO',
    marketLabel: 'no',
    marketName: 'Norge',
    langLabel: 'No',
    hrefLang: 'no-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
  },
  'no-en': {
    label: 'no-en',
    iso: 'en_NO',
    marketLabel: 'no',
    marketName: 'Norway',
    langLabel: 'En',
    hrefLang: 'en-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
  },
  dk: {
    label: 'dk',
    iso: 'da_DK',
    marketLabel: 'dk',
    marketName: 'Danmark',
    langLabel: 'Da',
    hrefLang: 'da-dk',
  },
  'dk-en': {
    label: 'dk-en',
    iso: 'en_DK',
    marketLabel: 'dk',
    marketName: 'Denmark',
    langLabel: 'En',
    hrefLang: 'en-dk',
  },
}

export const fallbackLocale = locales.se

export const getLocaleData = (label: LocaleData['label']): LocaleData => {
  return locales[label] ?? fallbackLocale
}

export const getAssociatedLocales = (locale: LocaleData): LocaleData[] => {
  const currentMarket = locale.marketLabel
  const localesArr = Object.values(locales)
  return localesArr.filter(({ marketLabel }) => marketLabel === currentMarket)
}
