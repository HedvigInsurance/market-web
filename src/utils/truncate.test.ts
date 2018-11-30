import { truncate } from './truncate'

it("doesn't truncate text that is too short or equal to string length", () => {
  const text = 'foobar'

  expect(truncate(7)(text)).toEqual(text)
  expect(truncate(6)(text)).toEqual(text)
})

it('truncates text that is too long', () => {
  const text = 'foobar'
  expect(truncate(5)(text)).toEqual('fooba...')
})

it('trims truncations', () => {
  const text = 'foo bar'
  expect(truncate(4)(text)).toEqual('foo...')
})

it("doesn't 💥 on emtpy string null/unefined", () => {
  expect(truncate(5)('')).toEqual('')
})
