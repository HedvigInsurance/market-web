import React, { useMemo } from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { GlobalStory } from 'storyblok/StoryContainer'
import { Tabs } from '../Tabs/Tabs'
import { PerilCollection } from './PerilCollection/PerilCollection'
import { PerilsCollection } from './types'

type Props = {
  color?: minimalColorComponentColors
  perilsCollections: PerilsCollection[]
  story: GlobalStory
}

export const Perils: React.FC<Props> = ({
  color = 'standard',
  perilsCollections,
  story,
}) => {
  const tabItems = useMemo(
    () =>
      perilsCollections.map((perilsCollection: PerilsCollection) => ({
        id: perilsCollection.id,
        name: perilsCollection.label,
        content: (
          <PerilCollection
            key={perilsCollection.id}
            perils={perilsCollection.items}
            story={story}
            color={color}
          />
        ),
      })),
    [color, perilsCollections, story],
  )

  return <Tabs items={tabItems} />
}
