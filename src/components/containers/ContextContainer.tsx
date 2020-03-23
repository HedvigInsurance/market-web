import { Container } from 'constate'
import React from 'react'

interface Context {
  lang: string
}

export const ContextContainer: React.FunctionComponent<{
  children: (context: Context) => React.ReactNode
}> = ({ children }) => (
  <Container<Context> context="context" children={children} />
)
