import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const AlignableContentWrapperComponent = styled(ContentWrapper)(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'center' ? 'column' : 'row',
    justifyContent: textPosition === 'left' ? 'space-between' : 'center',
    alignItems: textPosition === 'center' ? 'center' : 'start',
    textAlign: textPosition === 'center' ? 'center' : 'left',
    [MOBILE_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

const TitleComponent = styled('h2')(
  ({ textPosition }: { textPosition: string }) => ({
    fontSize: '3rem',
    marginRight: textPosition === 'left' ? 'auto' : 0,
    marginLeft: textPosition === 'right' ? 'auto' : 0,
    width: '100%',
    maxWidth: '50%',
    [MOBILE_BP_DOWN]: {
      maxWidth: '100%',
    },
  }),
)

const ParagraphComponent = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    display: textPosition === 'right' ? 'none' : 'block',
    maxWidth: textPosition === 'left' ? '40%' : '36rem',
    width: '100%',
    fontSize: '1.25rem',
    [MOBILE_BP_DOWN]: {
      maxWidth: '100%',
      display: 'block',
    },
  }),
)

interface TitleParagraphBlockInterface extends BaseBlockProps {
  title: string
  text_position: string
  paragraph: MarkdownHtmlComponent
}

export const TitleParagraphBlock: React.FunctionComponent<
  TitleParagraphBlockInterface
> = ({ title, text_position, paragraph, color }) => {
  return (
    <SectionWrapper color={color && color.color}>
      <AlignableContentWrapperComponent textPosition={text_position}>
        <TitleComponent textPosition={text_position}>{title}</TitleComponent>
        <ParagraphComponent
          textPosition={text_position}
          dangerouslySetInnerHTML={{
            __html: paragraph.html,
          }}
        />
      </AlignableContentWrapperComponent>
    </SectionWrapper>
  )
}
