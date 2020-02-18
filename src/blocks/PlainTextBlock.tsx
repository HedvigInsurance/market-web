import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const PlainTextSectionWrapper = styled(SectionWrapper)({
  paddingBottom: '0 !important',
})

const TitleWrapper = styled('div')({
  paddingBottom: '2.5rem',
})

const ContentColorWrapper = styled('div')({
  backgroundColor: colors.WHITE,
  color: colors.OFF_BLACK_DARK,
})
const InnerContent = styled('div')({
  maxWidth: '40rem',
})

export interface PlainTextBlockProps extends BaseBlockProps {
  title: string
  content: MarkdownHtmlComponent
}

export const PlainTextBlock: React.FunctionComponent<PlainTextBlockProps> = ({
  color,
  size,
  extra_styling,
  title,
  content,
  index,
}) => (
  <PlainTextSectionWrapper
    color={color && color.color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper index={index}>
      <TitleWrapper>
        <h1>{title}</h1>
      </TitleWrapper>
    </ContentWrapper>
    <ContentColorWrapper>
      <ContentWrapper index={index}>
        <InnerContent
          dangerouslySetInnerHTML={{ __html: content && content.html }}
        />
      </ContentWrapper>
    </ContentColorWrapper>
  </PlainTextSectionWrapper>
)
