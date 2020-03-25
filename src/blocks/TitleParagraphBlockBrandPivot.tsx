import styled from '@emotion/styled'
import React from 'react'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
} from './BaseBlockProps'

const Headline = styled('h4')({
  textTransform: 'uppercase',
  fontSize: '1rem',
  margin: 0,
  [MOBILE_BP_DOWN]: {
    textAlign: 'center',
  },
})

const Paragraph = styled('div')({
  display: 'block',
  maxWidth: '100%',
  width: '100%',
  fontSize: '2rem',
  lineHeight: '125%',

  [MOBILE_BP_DOWN]: {
    maxWidth: '100%',
    display: 'block',
    fontSize: '1.25rem',
    textAlign: 'center',
  },

  '> :first-child': {
    marginTop: '1rem',
  },

  '> p:last-child': {
    marginBottom: 0,
  },
})

interface TitleParagraphBlockInterface extends BrandPivotBaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
}

export const TitleParagraphBlockBrandPivot: React.FunctionComponent<TitleParagraphBlockInterface> = ({
  title,
  paragraph,
  color,
  size,
  index,
}) => {
  return (
    <SectionWrapper brandPivot colorComponent={color} size={size}>
      <ContentWrapper brandPivot index={index}>
        <Headline>{title}</Headline>
        <Paragraph
          dangerouslySetInnerHTML={{
            __html: paragraph.html,
          }}
        />
      </ContentWrapper>
    </SectionWrapper>
  )
}
