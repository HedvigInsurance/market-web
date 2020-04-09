import styled from '@emotion/styled'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import { ContextContainer } from 'components/containers/ContextContainer'
import { Perils } from 'components/Perils'
import { TypeOfContract } from 'components/Perils/types'
import { Select } from 'components/Select/Select'
import React, { useState } from 'react'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'

export interface ContractOption {
  label: string
  value: TypeOfContract
}

interface PerilsBlockProps extends BrandPivotBaseBlockProps {
  insurance_types: ContractOption[]
}

const SelectInsurance = styled(Select)`
  max-width: 16rem;
  margin: 0 auto 5rem;
`

export const PerilsBlock: React.FC<PerilsBlockProps> = ({
  color,
  index,
  size,
  insurance_types,
}) => {
  const [currentInsurance, setCurrentInsurance] = useState<TypeOfContract>(
    insurance_types[0].value,
  )

  const onChangeHandler = (option: any) => {
    setCurrentInsurance(option.value)
  }

  return (
    <GlobalStoryContainer>
      {({ globalStory }) => (
        <ContextContainer>
          {(context) => (
            <SectionWrapper colorComponent={color} size={size} brandPivot>
              <ContentWrapper brandPivot index={index}>
                {insurance_types.length > 1 && (
                  <SelectInsurance
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
                    currentLocale={context.lang}
                    story={globalStory}
                  />
                )}
              </ContentWrapper>
            </SectionWrapper>
          )}
        </ContextContainer>
      )}
    </GlobalStoryContainer>
  )
}
