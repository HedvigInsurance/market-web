import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const ColumnContentWrapper = styled(ContentWrapper)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
})

const Title = styled('h2')({
  fontSize: '3.75rem',
  width: '100%',
  margin: 0,
  [TABLET_BP_DOWN]: {
    fontSize: '2.25rem',
  },
})

const Picture = styled('picture')({
  maxWidth: '47rem',
  marginTop: '3.125rem',
  [TABLET_BP_DOWN]: {
    maxWidth: '100%',
    width: 'auto',
    display: 'block',
  },
})

const Paragraph = styled('div')({
  display: 'block',
  marginTop: '3.125rem',
  p: {
    margin: 0,
  },
})

interface IconForestBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
}

export const IconForestBlock: React.FunctionComponent<IconForestBlockProps> = ({
  title,
  paragraph,
  color,
}) => {
  return (
    <SectionWrapper color={color && color.color}>
      <ColumnContentWrapper>
        <Title>{title}</Title>
        <Picture>
          <source
            media={`(max-width: 47rem)`}
            srcSet="/assets-next/iconForest/peril-forest-mobile@2x.png"
          />
          <img src="/assets-next/iconForest/peril-forest-desktop@2x.png" />
        </Picture>
        <Paragraph
          dangerouslySetInnerHTML={{
            __html: paragraph.html,
          }}
        />
      </ColumnContentWrapper>
    </SectionWrapper>
  )
}
