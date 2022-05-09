import React from 'react'
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
  if (perilsCollections.length === 1) {
    return (
      <PerilCollection
        key={perilsCollections[0].id}
        perils={perilsCollections[0].items}
        story={story}
        color={color}
      />
    )
  }

  return (
    <Tabs
      items={perilsCollections.map((perilsCollection: PerilsCollection) => ({
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
      }))}
    />
  )
}
