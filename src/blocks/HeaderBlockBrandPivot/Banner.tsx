import styled from '@emotion/styled'
import React from 'react'
import {
  MinimalColorComponent,
  MarkdownHtmlComponent,
} from 'src/blocks/BaseBlockProps'
import { SectionWrapper, TABLET_BP_UP } from '../../components/blockHelpers'

const BannerContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
  text-align: center;
  font-size: 0.875rem;

  ${TABLET_BP_UP} {
    font-size: 1rem;
  }

  & > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  a {
    white-space: nowrap;
  }
`

export const Banner: React.FC<{
  text: MarkdownHtmlComponent
  color?: MinimalColorComponent
}> = ({ color, text }) => (
  <SectionWrapper colorComponent={color} size="none">
    <BannerContent dangerouslySetInnerHTML={{ __html: text?.html }} />
  </SectionWrapper>
)
