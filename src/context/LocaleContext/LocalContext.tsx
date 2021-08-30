import React, { createContext } from 'react'
import { LocaleData } from 'utils/locales'

export type LocaleContext = {
  currentLocale: LocaleData
}

export const LocaleContext = createContext<LocaleContext | undefined>(undefined)

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
