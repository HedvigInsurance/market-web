import styled from '@emotion/styled'
import React from 'react'
import { components, OptionProps } from 'react-select'

type MarketSelectOption = {
  label: string
  value: string
}

const OptionLink = styled.a`
  text-decoration: none;
`

export const MarketOption: React.FC<OptionProps<MarketSelectOption>> = (
  props,
) => {
  return (
    <components.Option {...props}>
      <OptionLink href={`/${props.data.value}`}>{props.children}</OptionLink>
    </components.Option>
  )
}
