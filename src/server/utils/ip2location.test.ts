import { createIp2LocationCountryLookup } from 'server/utils/ip2location'

it('looks up sample ip', () => {
  const lookupCountry = createIp2LocationCountryLookup(
    './IP-COUNTRY-SAMPLE.BIN',
  )

  const usaIp = '8.8.8.8'
  expect(lookupCountry(usaIp)).toBe('US')
  const unknownIp = '123.123.123.123'
  expect(lookupCountry(unknownIp)).toBeNull()
})

it('always returns null when creating lookup function without valid DB', () => {
  const lookupCountry = createIp2LocationCountryLookup('./INVALID-IP.BIN')

  const usaIp = '8.8.8.8'
  expect(lookupCountry(usaIp)).toBe(null)
})
