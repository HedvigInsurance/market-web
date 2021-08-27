import React, { createContext, useContext } from 'react'
import { LocaleData, locales } from 'utils/locales'

export type LocaleContext = {
  currentLocale: LocaleData
}

export const LocaleContext = createContext<LocaleContext>({
  currentLocale: locales['se-en'],
})

export const useLocale = () => useContext(LocaleContext)

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
