import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MarkdownHtmlComponent } from 'blocks/BaseBlockProps'
import React from 'react'
import { MOBILE_BP_UP } from './blockHelpers'

interface CaptionProps {
  caption: MarkdownHtmlComponent
}

const CaptionContent = styled.div`
  margin-top: 0.5rem;
  color: ${colorsV3.gray700};
  font-size: 0.625rem;
  line-height: 1.4;

  p {
    margin: 0;
  }

  ${MOBILE_BP_UP} {
    font-size: 0.75rem;
  }
`

export const Caption: React.FC<CaptionProps> = ({ caption }) => (
  <CaptionContent
    dangerouslySetInnerHTML={{
      __html: caption.html,
    }}
  />
)
