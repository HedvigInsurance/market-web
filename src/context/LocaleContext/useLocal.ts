import { useContext } from 'react'
import { LocaleContext } from './LocalContext'

export const useLocal = () => {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocal has to be used inside a LocaleProvider')
  }
  return context
}
