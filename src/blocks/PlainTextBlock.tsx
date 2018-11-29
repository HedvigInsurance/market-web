import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const PlainTextSectionWrapper = styled(SectionWrapper)({
  paddingBottom: 0,
})

const TitleWrapper = styled('div')({
  paddingBottom: '2.5rem',
})

const ContentColorWrapper = styled('div')({
  backgroundColor: colors.WHITE,
  color: colors.OFF_BLACK_DARK,
  padding: '1.25rem 0 7rem 0',
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
  title,
  content,
}) => (
  <PlainTextSectionWrapper color={color && color.color}>
    <ContentWrapper>
      <TitleWrapper>
        <h1>{title}</h1>
      </TitleWrapper>
    </ContentWrapper>
    <ContentColorWrapper>
      <ContentWrapper>
        <InnerContent
          dangerouslySetInnerHTML={{ __html: content && content.html }}
        />
      </ContentWrapper>
    </ContentColorWrapper>
  </PlainTextSectionWrapper>
)
