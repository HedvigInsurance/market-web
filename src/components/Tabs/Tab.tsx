import React, { createRef } from 'react'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { LAPTOP_BP_UP } from '../blockHelpers'
import { UnderlineComponent, UNDERLINE_HEIGHT } from './Underline'

const TabContainer = styled.button<{ selected?: boolean }>`
  background-color: transparent;
  border: 0;
  color: ${({ selected }) => (selected ? colorsV3.gray900 : colorsV3.gray500)};
  cursor: pointer;
  display: flex;
  font-size: 1.25rem;
  line-height: 1.4;
  padding: 0 1rem calc(0.25rem + ${UNDERLINE_HEIGHT}) 0;
  position: relative;
  flex-shrink: 0;
  overflow-wrap: anywhere;
  margin: 0;

  &:hover {
    color: ${colorsV3.gray900};
  }

  ${LAPTOP_BP_UP} {
    font-size: 1.5rem;
    line-height: 1.33;
    padding-right: 2.5rem;
  }
`

type Props = {
  onClick: () => void
  selected?: boolean
  name: string
}

export const Tab: React.FC<Props> = ({ onClick, selected, name }) => {
  const ref = createRef<HTMLButtonElement>()
  return (
    <TabContainer
      onClick={onClick}
      selected={selected}
      ref={ref}
      role="tab"
      aria-selected={selected ? 'true' : 'false'}
      aria-controls={name}
      id={name}
      tabIndex={selected ? undefined : -1}
    >
      {name}
      {selected && <UnderlineComponent />}
    </TabContainer>
  )
}
