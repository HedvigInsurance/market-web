import styled from '@emotion/styled'
import { BaseBlockProps } from 'blocks/BaseBlockProps'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import * as React from 'react'
import { textFlexPositionMap, TextPosition } from 'utils/textPosition'

interface LabelBlockProps extends BaseBlockProps {
  label_position: TextPosition
}
const LabelContentWrapper = styled(ContentWrapper)<{
  textPosition: TextPosition
}>(({ textPosition }) => ({
  display: 'flex',
  justifyContent: textFlexPositionMap[textPosition],
  fontSize: '1.5rem',
  textTransform: 'uppercase',
}))

export const LabelBlock: React.FC<LabelBlockProps> = ({
  color,
  label_position,
  extra_styling,
}) => (
  <SectionWrapper color={color?.color} extraStyling={extra_styling} size="none">
    <LabelContentWrapper textPosition={label_position}>
      howdy
    </LabelContentWrapper>
  </SectionWrapper>
)
