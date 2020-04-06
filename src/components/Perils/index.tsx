import React from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { usePerils } from './data/usePerils'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { TypeOfContract } from './types'

interface Props {
  color?: minimalColorComponentColors
  insuranceType: TypeOfContract
}

export const Perils: React.FC<Props> = ({
  insuranceType,
  color = 'standard',
}) => {
  const perils = usePerils(insuranceType)

  return (
    <>
      <PerilCollection color={color} perils={perils} />
      {/* TODO Add Peril modal */}
    </>
  )
}
