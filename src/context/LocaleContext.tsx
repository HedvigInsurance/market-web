import React, { createContext, useContext } from 'react'
import { LocaleData, locales } from 'src/l10n/locales'

type LocaleContextProps = {
  currentLocale: LocaleData
}

const LocaleContext = createContext<LocaleContextProps>({
  currentLocale: locales['se-en'],
})

export const useLocale = () => useContext(LocaleContext)

export const LocaleProvider: React.FC<LocaleContextProps> = ({
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
