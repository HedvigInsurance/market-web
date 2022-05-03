import React, { useState } from 'react'
import { minimalColorComponentColors } from 'blocks/BaseBlockProps'
import { GlobalStory } from 'storyblok/StoryContainer'
import { PerilList } from 'components/Perils/PerilList/PerilList'
import { PerilModal } from 'components/Perils/PerilModal/PerilModal'
import { Peril } from 'components/Perils/types'

type Props = {
  color: minimalColorComponentColors
  perils: Peril[]
  story: GlobalStory
}

export const PerilCollection: React.FC<Props> = ({ perils, story, color }) => {
  const [isShowingPeril, setIsShowingPeril] = useState(false)
  const [currentPeril, setCurrentPeril] = useState(0)
  return (
    <>
      <PerilList
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
