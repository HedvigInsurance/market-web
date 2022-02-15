import styled from '@emotion/styled'
import React from 'react'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from '../BaseBlockProps'

const Headline = styled('h4')({
  textTransform: 'uppercase',
  fontSize: '1rem',
  margin: 0,
  [MOBILE_BP_DOWN]: {
    textAlign: 'center',
  },
})

const Paragraph = styled('div')({
  fontSize: '2rem',
  lineHeight: 1.25,

  [MOBILE_BP_DOWN]: {
    display: 'block',
    fontSize: '1.25rem',
    textAlign: 'center',
  },

  '> :first-child': {
    marginTop: '1.5rem',
  },

  '> p:last-child': {
    marginBottom: 0,
  },
})

const TitleParagraphContentWrapper = styled(ContentWrapper)({
  maxWidth: '930px',
})

export interface TitleParagraphBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
}

export const TitleParagraphBlock: React.FunctionComponent<TitleParagraphBlockProps> = ({
  title,
  paragraph,
  color,
  size,
  index,
}) => {
  return (
    <SectionWrapper brandPivot colorComponent={color} size={size}>
      <TitleParagraphContentWrapper brandPivot index={index}>
        <Headline>{title}</Headline>
        <Paragraph
          dangerouslySetInnerHTML={{
            __html: paragraph?.html,
          }}
        />
      </TitleParagraphContentWrapper>
    </SectionWrapper>
  )
}
