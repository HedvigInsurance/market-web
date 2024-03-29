type Label = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en'
type IsoCode = 'sv_SE' | 'en_SE' | 'nb_NO' | 'en_NO' | 'da_DK' | 'en_DK'
type MarketLabel = 'se' | 'no' | 'dk'
type MarketName =
  | 'Sverige'
  | 'Sweden'
  | 'Norge'
  | 'Norway'
  | 'Danmark'
  | 'Denmark'
type LanguageLabel = 'Sv' | 'En' | 'No' | 'Da'
type HtmlLang = 'sv-SE' | 'en-SE' | 'no-NO' | 'en-NO' | 'da-DK' | 'en-DK'
type HrefLang = 'sv-se' | 'en-se' | 'no-no' | 'en-no' | 'da-dk' | 'en-dk'

export type LocaleData = {
  label: Label
  iso: IsoCode
  marketLabel: MarketLabel
  marketName: MarketName
  langLabel: LanguageLabel
  htmlLang: HtmlLang
  hrefLang: HrefLang
  adtractionSrc?: string
  trustpilotLocale?: string
}

export type Locales = Record<Label, LocaleData>

export const locales: Locales = {
  se: {
    label: 'se',
    iso: 'sv_SE',
    marketLabel: 'se',
    marketName: 'Sverige',
    langLabel: 'Sv',
    htmlLang: 'sv-SE',
    hrefLang: 'sv-se',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    trustpilotLocale: 'sv-SE',
  },
  'se-en': {
    label: 'se-en',
    iso: 'en_SE',
    marketLabel: 'se',
    marketName: 'Sweden',
    langLabel: 'En',
    htmlLang: 'en-SE',
    hrefLang: 'en-se',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1412531808',
    trustpilotLocale: 'en-US',
  },
  no: {
    label: 'no',
    iso: 'nb_NO',
    marketLabel: 'no',
    marketName: 'Norge',
    langLabel: 'No',
    htmlLang: 'no-NO',
    hrefLang: 'no-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    trustpilotLocale: 'nb-NO',
  },
  'no-en': {
    label: 'no-en',
    iso: 'en_NO',
    marketLabel: 'no',
    marketName: 'Norway',
    langLabel: 'En',
    htmlLang: 'en-NO',
    hrefLang: 'en-no',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1492109567',
    trustpilotLocale: 'en-US',
  },
  dk: {
    label: 'dk',
    iso: 'da_DK',
    marketLabel: 'dk',
    marketName: 'Danmark',
    langLabel: 'Da',
    htmlLang: 'da-DK',
    hrefLang: 'da-dk',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    trustpilotLocale: 'da-DK',
  },
  'dk-en': {
    label: 'dk-en',
    iso: 'en_DK',
    marketLabel: 'dk',
    marketName: 'Denmark',
    langLabel: 'En',
    htmlLang: 'en-DK',
    hrefLang: 'en-dk',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    trustpilotLocale: 'en-US',
  },
}
