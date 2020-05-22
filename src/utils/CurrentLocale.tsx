export enum Locale {
  SvSe = 'sv_SE',
  EnSe = 'en_SE',
  NbNo = 'nb_NO',
  EnNo = 'en_NO',
}

export enum HreflangLocale {
  SvSe = 'sv-se',
  EnSe = 'en-se',
  NoNo = 'no-no',
  EnNo = 'en-no',
}

export enum HtmlLang {
  Sv = 'sv',
  En = 'en',
  No = 'no',
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
    case 'se-en':
      return 'SE/En'
    case 'no':
      return 'NO/No'
    case 'no-en':
      return 'NO/En'
    default:
      return 'SE/Sv'
  }
}

export const getCurrentMarket = (locale: string) => {
  switch (locale) {
    case 'no':
    case 'no-en':
      return 'no'
    default:
      return 'se'
  }
}

export const getHreflangIsoCode = (locale: string) => {
  switch (locale) {
    case 'se-en':
      return HreflangLocale.EnSe
    case 'no':
      return HreflangLocale.NoNo
    case 'no-en':
      return HreflangLocale.EnNo
    default:
      return HreflangLocale.SvSe
  }
}

export const getHtmlLang = (locale: string) => {
  switch (locale) {
    case 'se':
      return HtmlLang.Sv
    case 'no':
      return HtmlLang.No
    default:
      return HtmlLang.En
  }
}
