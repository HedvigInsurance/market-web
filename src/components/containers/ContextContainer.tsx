import React from 'react'
import { Container } from 'constate'
import { LocaleData } from 'src/l10n/locales'

type Context = {
  currentLocale: LocaleData
}

export const ContextContainer: React.FunctionComponent<{
  children: (context: Context) => React.ReactNode
}> = ({ children }) => (
  <Container<Context> context="context">{children}</Container>
)
