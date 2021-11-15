import React, { useState } from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { GlobalStory } from 'storyblok/StoryContainer'
import { LocaleData } from 'l10n/locales'
import { usePerils } from './data/usePerils'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { PerilModal } from './PerilModal/PerilModal'
import { TypeOfContract } from './types'

type Props = {
  color?: minimalColorComponentColors
  insuranceType: TypeOfContract
  localeIsoCode: LocaleData['iso']
  story: GlobalStory
}

export const Perils: React.FC<Props> = ({
  insuranceType,
  localeIsoCode,
  story,
  color = 'standard',
}) => {
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
