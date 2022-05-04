import styled from '@emotion/styled'
import React from 'react'
import { useLocale } from 'context/LocaleContext'
import { BaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper as OriginalContentWrapper,
  SectionWrapper,
} from 'components/blockHelpers'
import {
  Peril,
  PerilsCollection,
  TypeOfContract,
} from 'components/Perils/types'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'
import { Perils } from 'components/Perils'
import { usePerils } from 'components/Perils/data/usePerils'

export type ContractOption = {
  label: string
  value: TypeOfContract
}

export type PerilsBlockProps = BaseBlockProps & {
  insurance_types: ContractOption[]
}

const ContentWrapper = styled(OriginalContentWrapper)`
  max-width: calc(784px + 2rem);
`

export const PerilsBlock: React.FC<PerilsBlockProps> = ({
  color,
  index,
  size,
  insurance_types,
}) => {
  const { currentLocale } = useLocale()
  const insuranceTypes = insurance_types.map(
    (insuranceType) => insuranceType.value,
  )
  const perils = usePerils(insuranceTypes, currentLocale.iso)

  const perilsCollections = perils.map(
    (perilItems: Peril[], i: number): PerilsCollection => ({
      id: insurance_types[i].value,
      label: insurance_types[i].label,
      items: perilItems,
    }),
  )

  return (
    <GlobalStoryContainer>
      {({ globalStory }) => (
        <SectionWrapper colorComponent={color} size={size} brandPivot>
          <ContentWrapper brandPivot index={index}>
            {perilsCollections.length > 0 && (
              <Perils
                color={color?.color}
                perilsCollections={perilsCollections}
                story={globalStory}
              />
            )}
          </ContentWrapper>
        </SectionWrapper>
      )}
    </GlobalStoryContainer>
  )
}
