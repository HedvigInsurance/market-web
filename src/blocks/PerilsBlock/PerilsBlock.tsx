import styled from '@emotion/styled'
import React, { useMemo } from 'react'
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
import { getPerilsComparison } from 'components/Perils/Perils.helpers'

export type ContractOption = {
  label: string
  value: TypeOfContract
}

export type PerilsBlockProps = BaseBlockProps & {
  insurance_types: ContractOption[]
  compare_perils?: boolean
}

const ContentWrapper = styled(OriginalContentWrapper)`
  max-width: calc(784px + 2rem);
`

export const PerilsBlock: React.FC<PerilsBlockProps> = ({
  color,
  index,
  size,
  insurance_types,
  compare_perils,
}) => {
  const { currentLocale } = useLocale()
  const insuranceTypes = useMemo(
    () => insurance_types.map((insuranceType) => insuranceType.value),
    [insurance_types],
  )

  const perils = usePerils(insuranceTypes, currentLocale.iso)
  const perilsGroup = useMemo(
    () => (compare_perils ? getPerilsComparison(perils) : perils),
    [compare_perils, perils],
  )

  const perilsCollections = perilsGroup.map(
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
