import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import { Perils } from 'components/Perils'
import { TypeOfContract } from 'components/Perils/types'
import React from 'react'

interface PerilsBlockProps extends BrandPivotBaseBlockProps {
  insurance_type: TypeOfContract
}

export const PerilsBlock: React.FC<PerilsBlockProps> = ({
  color,
  index,
  size,
  insurance_type,
}) => {
  return (
    <SectionWrapper colorComponent={color} size={size} brandPivot>
      <ContentWrapper brandPivot index={index} fullWidth={true}>
        {insurance_type && <Perils insuranceType={insurance_type} />}
      </ContentWrapper>
    </SectionWrapper>
  )
}
