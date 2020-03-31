import styled from '@emotion/styled'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import { Perils } from 'components/Perils'
import { TypeOfContract } from 'components/Perils/types'
import React from 'react'

interface PerilsBlockProps extends BrandPivotBaseBlockProps {
  insurance_type: TypeOfContract
}

const PerislWrapper = styled(ContentWrapper)({
  ...SITE_MAX_WIDTH,
})

export const PerilsBlock: React.FC<PerilsBlockProps> = ({
  color,
  index,
  size,
  insurance_type,
}) => (
  <SectionWrapper colorComponent={color} size={size} brandPivot>
    <PerislWrapper brandPivot index={index}>
      {insurance_type && <Perils insuranceType={insurance_type} />}
    </PerislWrapper>
  </SectionWrapper>
)
