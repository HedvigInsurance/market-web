import { getLocaleFromPath } from './page'

describe('getLocaleFromPath', () => {
  it('returns locale if path contains locale', () => {
    const path = '/se'
    expect(getLocaleFromPath(path)).toBe('se')
  })

  it('returns locale if complex path contains locale', () => {
    const path = '/dk-en/hjemførseikring'
    expect(getLocaleFromPath(path)).toBe('dk-en')
  })

  it('returns an empty string if path does not contain locale', () => {
    const path = '/'
    expect(getLocaleFromPath(path)).toBe('')
  })
})
