import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

import { ContentWrapper, SectionWrapper } from '../../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from '../BaseBlockProps'
import { PressItem } from './PressItem'

const Title = styled('h3')({
  fontSize: 60,
  lineHeight: '65px',
  fontFamily: fonts.SORAY,
  marginBottom: 40,
  '@media (max-width: 650px)': {
    fontSize: 45,
    lineHeight: '50px',
  },
})

const Footnote = styled('span')({
  display: 'block',
  fontSize: 18,
  lineHeight: '24px',
  marginTop: 40,
  textAlign: 'center',

  '& a[href^="mailto:"]': {
    color: colors.PURPLE,
  },
})

export interface PressItemProps {
  _uid: string
  logo: string
  title: string
  text: string
  link: string
}

interface PressBlockProps extends BaseBlockProps {
  items: ReadonlyArray<PressItemProps>
  footnote: MarkdownHtmlComponent
  title: string
}

export const PressBlock: React.FunctionComponent<PressBlockProps> = ({
  title,
  items,
  footnote,
  color,
}) => (
  <SectionWrapper color={color && color.color}>
    <ContentWrapper id="press">
      <Title>{title}</Title>
      {items.map((pressItem) => (
        <PressItem key={pressItem._uid} {...pressItem} />
      ))}
      <Footnote
        dangerouslySetInnerHTML={{ __html: footnote && footnote.html }}
      />
    </ContentWrapper>
  </SectionWrapper>
)
