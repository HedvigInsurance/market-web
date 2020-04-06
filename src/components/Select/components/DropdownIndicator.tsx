import { Chevron } from 'components/icons/Chevron'
import React from 'react'
import { components, IndicatorProps } from 'react-select'
import { OptionType } from '../Select'

export const DropdownIndicator: React.FC<IndicatorProps<OptionType>> = (
  props,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Chevron size="0.875rem" />
    </components.DropdownIndicator>
  )
}
