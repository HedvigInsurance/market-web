import React from 'react'
import { usePerils } from './data/usePerils'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { TypeOfContract } from './types'

interface Props {
  insuranceType: TypeOfContract
}

export const Perils: React.FC<Props> = ({ insuranceType }) => {
  const perils = usePerils(insuranceType)

  return (
    <>
      <PerilCollection perils={perils} />
      {/* TODO Add Peril modal */}
    </>
  )
}
