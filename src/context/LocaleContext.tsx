import React, { createContext, useContext } from 'react'
import { LocaleData, locales } from 'utils/locales'

export type LocaleContext = {
  currentLocale: LocaleData
}

export const LocaleContext = createContext<LocaleContext>({
  currentLocale: locales['se-en'],
})

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale has to be used inside a LocaleProvider')
  }
  return context
}

export const LocaleProvider: React.FC<LocaleContext> = ({
  currentLocale,
  children,
}) => {
  return (
    <LocaleContext.Provider
      value={{
        currentLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}
