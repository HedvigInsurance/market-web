import styled from '@emotion/styled'
import * as React from 'react'
import {
  BaseBlockProps,
  MarkdownHtmlComponent,
} from 'src/blocks/BaseBlockProps'
import {
  CONTENT_MAX_WIDTH,
  SectionWrapper,
  TABLET_BP_UP,
} from '../../components/blockHelpers'

const BannerContent = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  padding: '1rem',
  textAlign: 'center',
  ...CONTENT_MAX_WIDTH,

  [TABLET_BP_UP]: {
    padding: '1.25rem',
  },

  '& > *': {
    marginTop: '0',
    marginBottom: '0',
  },
})

interface BannerBlockProps extends BaseBlockProps {
  text: MarkdownHtmlComponent
}

export const BannerBlock: React.FC<BannerBlockProps> = ({
  color,
  extra_styling,
  text,
}) => (
  <SectionWrapper
    colorComponent={color}
    extraStyling={extra_styling}
    size="none"
  >
    <BannerContent dangerouslySetInnerHTML={{ __html: text?.html }} />
  </SectionWrapper>
)
