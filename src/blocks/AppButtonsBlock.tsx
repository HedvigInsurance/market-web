import { AppButtons } from 'components/AppButtons/AppButtons'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import React from 'react'
import { BrandPivotBaseBlockProps } from './BaseBlockProps'

export const AppButtonsBlock: React.FC<BrandPivotBaseBlockProps> = ({
  index,
  color,
  extra_styling,
}) => (
  <SectionWrapper
    brandPivot
    colorComponent={color}
    size="none"
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot index={index}>
      <AppButtons alignCenter />
    </ContentWrapper>
  </SectionWrapper>
)
