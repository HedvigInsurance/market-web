import styled from '@emotion/styled'
import React from 'react'
import {
  ColorComponent,
  MarkdownHtmlComponent,
} from 'src/blocks/BaseBlockProps'
import {
  CONTENT_MAX_WIDTH_DEPRECATED,
  SectionWrapper,
  TABLET_BP_UP,
} from '../../components/blockHelpers'

const BannerContent = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '0.5rem',
  textAlign: 'center',
  fontSize: '0.88rem',
  ...CONTENT_MAX_WIDTH_DEPRECATED,

  [TABLET_BP_UP]: {
    fontSize: '1rem',
  },

  '& > *': {
    marginTop: '0',
    marginBottom: '0',
  },
})

export const Banner: React.FC<{
  text: MarkdownHtmlComponent
  color?: ColorComponent
}> = ({ color, text }) => (
  <SectionWrapper colorComponent={color} size="none">
    <BannerContent dangerouslySetInnerHTML={{ __html: text?.html }} />
  </SectionWrapper>
)
