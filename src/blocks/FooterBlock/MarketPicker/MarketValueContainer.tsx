import styled from '@emotion/styled'
import React from 'react'
import { components, ValueContainerProps } from 'react-select'
import { Globe } from 'components/icons/Globe'
import { MarketSelectOption } from './MarketPicker'

const GlobeIcon = styled(Globe)`
  margin-left: -0.875rem;
`

const ValueWrapper = styled.div`
  position: relative;
  display: block;
  max-width: calc(100% - 1rem);
  width: 100%;
  padding-left: 0.5rem;
`

export const MarketValueContainer: React.FC<
  ValueContainerProps<MarketSelectOption>
> = (props) => {
  return (
    <components.ValueContainer {...props}>
      <GlobeIcon size="1.5rem" />
      <ValueWrapper>{props.children}</ValueWrapper>
    </components.ValueContainer>
  )
}
