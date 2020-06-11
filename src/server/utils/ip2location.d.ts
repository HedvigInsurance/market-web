export const lookupCountry: (ip: string) => string | null
export const createIp2LocationCountryLookup: (
  filePath: string,
) => typeof lookupCountry
