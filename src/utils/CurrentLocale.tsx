export enum Locale {
  SvSe = 'sv_SE',
  EnSe = 'en_SE',
  NbNo = 'nb_NO',
  EnNo = 'en_NO',
}

export const getLocaleIsoCode = (locale: string): Locale => {
  switch (locale) {
    case 'se-en':
      return Locale.EnSe
    case 'no':
      return Locale.NbNo
    case 'no-en':
      return Locale.EnNo
    default:
      return Locale.SvSe
  }
}

export const getMarketLocale = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'SE/En'
    case 'no':
      return 'NO/No'
    case 'no-en':
      return 'NO/En'
    default:
      return 'SE/Sv'
  }
}
