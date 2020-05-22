import styled from '@emotion/styled'
import { LAPTOP_BP_UP, TABLET_BP_UP } from 'components/blockHelpers'
import { PerilItem } from 'components/Perils/PerilItem/PerilItem'
import React from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { Peril } from '../types'

interface Props {
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
    margin-left: -0.625rem;
  }

  & > * {
    display: flex;
    width: calc(50% - 0.5rem);
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;

    ${TABLET_BP_UP} {
      width: calc(100% / 3 - 0.625rem);
      margin-left: 0.625rem;
      margin-bottom: 0.625rem;
    }

    ${LAPTOP_BP_UP} {
      width: calc(25% - 0.625rem);
    }
  }
`

export const PerilCollection: React.FC<Props> = ({
  color,
  perils,
  setCurrentPeril,
  setIsShowingPeril,
}) => (
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
