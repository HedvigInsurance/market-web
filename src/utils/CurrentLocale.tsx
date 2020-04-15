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
