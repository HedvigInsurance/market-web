import styled from '@emotion/styled'
import React from 'react'
import { components, OptionProps } from 'react-select'
import { MarketSelectOption } from './MarketPicker'

const OptionLink = styled.a`
  width: 100%;
  text-align: left;
  text-decoration: none;
`

export const MarketOption: React.FC<OptionProps<MarketSelectOption, false>> = (
  props,
) => {
  return (
    <components.Option {...props}>
      <OptionLink href={`/${props.data.value}`}>{props.children}</OptionLink>
    </components.Option>
  )
}
