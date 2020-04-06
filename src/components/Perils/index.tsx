import React from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { usePerils } from './data/usePerils'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { PerilModal } from './PerilModal/PerilModal'
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
  const [isShowingPeril, setIsShowingPeril] = React.useState(false)
  const [currentPeril, setCurrentPeril] = React.useState(0)

  return (
    <>
      <PerilCollection
        color={color}
        perils={perils}
        setCurrentPeril={setCurrentPeril}
        setIsShowingPeril={setIsShowingPeril}
      />
      {perils.length > 0 && (
        <PerilModal
          perils={perils}
          currentPerilIndex={currentPeril}
          setCurrentPeril={setCurrentPeril}
          isVisible={isShowingPeril}
          onClose={() => setIsShowingPeril(false)}
        />
      )}
    </>
  )
}
