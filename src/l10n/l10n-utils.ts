import { LocaleData, Locales, locales } from './locales'

export const fallbackLocale = locales.se

export const getLocaleData = (label: LocaleData['label']): LocaleData => {
  return locales[label]
}

export const getAssociatedLocales = (locale: LocaleData): LocaleData[] => {
  const currentMarket = locale.marketLabel
  return Object.values(locales).filter(
    ({ marketLabel }) => marketLabel === currentMarket,
  )
}

export const checkIsInEnglish = (locale: LocaleData): boolean => {
  return locale.langLabel === 'En'
}

export const getMarketsInLocalLang = (localesObj: Locales) => {
  return Object.values(localesObj).filter((locale) => !checkIsInEnglish(locale))
}

export const getMarketsInEnglish = (localesObj: Locales) => {
  return Object.values(localesObj).filter((locale) => checkIsInEnglish(locale))
}
