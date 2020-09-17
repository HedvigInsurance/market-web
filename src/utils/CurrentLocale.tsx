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
type MarketName = string // 'Sverige' / 'Norway'
type HrefLang = string // format: 'sv-se' / 'en-no'

export type LocaleData = {
  label: Label
  iso: IsoCode
  marketLabel: MarketLabel
  name: MarketName
  hrefLang: HrefLang
  adtractionSrc?: string
}

export const locales: Record<Label, LocaleData> = {
  se: {
    label: 'se',
    iso: 'sv_SE',
    marketLabel: 'se',
    name: 'Sverige',
    hrefLang: 'sv-se',
    adtractionSrc: 'https://adtr.io/jsTag?ap=1412531808',
  },
  'se-en': {
    label: 'se-en',
    iso: 'en_SE',
    marketLabel: 'se',
    name: 'Sweden',
    hrefLang: 'en-se',
    adtractionSrc: 'https://adtr.io/jsTag?ap=1412531808',
  },
  no: {
    label: 'no',
    iso: 'nb_NO',
    marketLabel: 'no',
    name: 'Norge',
    hrefLang: 'no-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
  },
  'no-en': {
    label: 'no-en',
    iso: 'en_NO',
    marketLabel: 'no',
    name: 'Norway',
    hrefLang: 'en-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
  },
  dk: {
    label: 'dk',
    iso: 'da_DK',
    marketLabel: 'dk',
    name: 'Danmark',
    hrefLang: 'da-dk',
  },
  'dk-en': {
    label: 'dk-en',
    iso: 'en_DK',
    marketLabel: 'dk',
    name: 'Denmark',
    hrefLang: 'en-dk',
  },
}

export const fallbackLocale = locales.se

export const getLocaleData = (label: LocaleData['label']): LocaleData => {
  return locales[label] ?? fallbackLocale
}
