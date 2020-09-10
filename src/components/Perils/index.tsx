import React, { useState } from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { GlobalStory } from 'storyblok/StoryContainer'
import { getLocaleIsoCode } from 'utils/CurrentLocale'
import { usePerils } from './data/usePerils'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { PerilModal } from './PerilModal/PerilModal'
import { TypeOfContract } from './types'

interface Props {
  color?: minimalColorComponentColors
  insuranceType: TypeOfContract
  currentLocale: string
  story: GlobalStory
}

export const Perils: React.FC<Props> = ({
  insuranceType,
  currentLocale,
  story,
  color = 'standard',
}) => {
  const localeIsoCode = getLocaleIsoCode(currentLocale)
  const perils = usePerils(insuranceType, localeIsoCode)
  const [isShowingPeril, setIsShowingPeril] = useState(false)
  const [currentPeril, setCurrentPeril] = useState(0)

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
          story={story}
          onClose={() => setIsShowingPeril(false)}
        />
      )}
    </>
  )
}
