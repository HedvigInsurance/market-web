import styled from '@emotion/styled'
import React from 'react'
import { LAPTOP_BP_UP, TABLET_BP_UP } from 'components/blockHelpers'
import { PerilItem } from 'components/Perils/PerilItem/PerilItem'
import { minimalColorComponentColors } from 'blocks/BaseBlockProps'
import { Peril } from '../types'

type Props = {
  color: minimalColorComponentColors
  perils: ReadonlyArray<Peril>
  setCurrentPeril: (index: number) => void
  setIsShowingPeril: (isShowingPeril: boolean) => void
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -0.5rem;

  ${TABLET_BP_UP} {
    margin-left: -1rem;
  }

  & > * {
    width: calc(50% - 0.5rem);
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;

    ${TABLET_BP_UP} {
      width: calc(100% / 3 - 1rem);
      margin-left: 1rem;
      margin-bottom: 1rem;
    }

    ${LAPTOP_BP_UP} {
      width: calc(25% - 1rem);
    }
  }
`

export const PerilList = ({
  color,
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}: Props) => (
  <Wrapper>
    {perils.map((peril, perilIndex) => (
      <PerilItem
        key={peril.title?.toString() || 'unknown'}
        color={color}
        title={peril.title}
        icon={peril.icon}
        onClick={() => {
          setCurrentPeril(perilIndex)
          setIsShowingPeril(true)
        }}
      />
    ))}
  </Wrapper>
)
