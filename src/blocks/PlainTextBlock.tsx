import styled from '@emotion/styled'
import React from 'react'
import {
  ContentWrapper,
  MOBILE_BP_UP,
  SectionWrapper,
} from '../components/blockHelpers'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
} from './BaseBlockProps'

type ParagraphFontSizes = 'sm' | 'md' | 'lg' | 'xl'

const paragraphSizeMap = {
  sm: '1rem', // 16px
  md: '1.125rem', // 18px
  lg: '1.5rem', // 24px
  xl: '2rem', // 32px
}

const InnerContent = styled.div<{ fontSize: ParagraphFontSizes }>`
  max-width: 44rem;
  margin-left: auto;
  margin-right: auto;

  ${MOBILE_BP_UP} {
    font-size: ${(props) => paragraphSizeMap[props.fontSize]};
  }
`

export interface PlainTextBlockProps extends BrandPivotBaseBlockProps {
  content: MarkdownHtmlComponent
  font_size: ParagraphFontSizes
}

export const PlainTextBlock: React.FunctionComponent<PlainTextBlockProps> = ({
  color,
  size,
  extra_styling,
  font_size = 'sm',
  content,
  index,
}) => (
  <SectionWrapper
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot index={index}>
      <InnerContent
        fontSize={font_size}
        dangerouslySetInnerHTML={{ __html: content && content.html }}
      />
    </ContentWrapper>
  </SectionWrapper>
)
