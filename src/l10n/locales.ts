type Label = 'se' | 'se-en' | 'no' | 'no-en' | 'dk' | 'dk-en' | 'fr' | 'fr-en'
type IsoCode =
  | 'sv_SE'
  | 'en_SE'
  | 'nb_NO'
  | 'en_NO'
  | 'da_DK'
  | 'en_DK'
  | 'fr-FR'
  | 'en-FR'
type MarketLabel = 'se' | 'no' | 'dk' | 'fr'
type MarketName =
  | 'Sverige'
  | 'Sweden'
  | 'Norge'
  | 'Norway'
  | 'Danmark'
  | 'Denmark'
  | 'Français'
  | 'French'
type LanguageLabel = 'Sv' | 'En' | 'No' | 'Da' | 'Fr'
type HtmlLang = 'sv' | 'en' | 'no' | 'da' | 'fr'
type HrefLang =
  | 'sv-se'
  | 'en-se'
  | 'no-no'
  | 'en-no'
  | 'da-dk'
  | 'en-dk'
  | 'fr-fr'
  | 'en-fr'

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
    htmlLang: 'sv',
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
    htmlLang: 'en',
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
    htmlLang: 'no',
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
    htmlLang: 'en',
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
    htmlLang: 'da',
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
    htmlLang: 'en',
    hrefLang: 'en-dk',
    adtractionSrc: 'https://cdn.adt387.com/jsTag?ap=1589794294',
    trustpilotLocale: 'en-US',
  },
  fr: {
    label: 'fr',
    iso: 'fr-FR',
    marketLabel: 'fr',
    marketName: 'Français',
    langLabel: 'Fr',
    htmlLang: 'fr',
    hrefLang: 'fr-fr',
  },
  'fr-en': {
    label: 'fr-en',
    iso: 'en-FR',
    marketLabel: 'fr',
    marketName: 'French',
    langLabel: 'En',
    htmlLang: 'en',
    hrefLang: 'en-fr',
  },
}
