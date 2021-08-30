import styled from '@emotion/styled'
import React, { useState } from 'react'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper as OriginalContentWrapper,
  SectionWrapper,
} from 'components/blockHelpers'
import { Perils } from 'components/Perils'
import { TypeOfContract } from 'components/Perils/types'
import { Select } from 'components/Select/Select'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'
import { useLocal } from 'context/LocaleContext/useLocal'

export interface ContractOption {
  label: string
  value: TypeOfContract
}

interface PerilsBlockProps extends BrandPivotBaseBlockProps {
  insurance_types: ContractOption[]
}

const ContentWrapper = styled(OriginalContentWrapper)`
  max-width: calc(784px + 2rem);
`

const SelectInsurance = styled(Select)`
  max-width: 16rem;
  margin: 0 auto 5rem;
`

export const PerilsBlock: React.FC<PerilsBlockProps> = ({
  _uid,
  color,
  index,
  size,
  insurance_types,
}) => {
  const { currentLocale } = useLocal()
  const [currentInsurance, setCurrentInsurance] = useState<TypeOfContract>(
    insurance_types[0].value,
  )

  const onChangeHandler = (option: any) => {
    setCurrentInsurance(option.value)
  }

  return (
    <GlobalStoryContainer>
      {({ globalStory }) => (
        <SectionWrapper colorComponent={color} size={size} brandPivot>
          <ContentWrapper brandPivot index={index}>
            {insurance_types.length > 1 && (
              <SelectInsurance
                instanceId={_uid}
                defaultValue={insurance_types[0]}
                options={insurance_types}
                color={color?.color}
                onChange={onChangeHandler}
              />
            )}
            {currentInsurance && (
              <Perils
                color={color?.color}
                insuranceType={currentInsurance}
                localeIsoCode={currentLocale.iso}
                story={globalStory}
              />
            )}
          </ContentWrapper>
        </SectionWrapper>
      )}
    </GlobalStoryContainer>
  )
}
