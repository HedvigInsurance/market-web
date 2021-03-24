import React from 'react'
import { components, IndicatorProps } from 'react-select'
import { Chevron } from 'components/icons/Chevron'
import { OptionType } from '../Select'

export const DropdownIndicator: React.FC<IndicatorProps<OptionType, false>> = (
  props,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <Chevron size="0.875rem" />
    </components.DropdownIndicator>
  )
}
