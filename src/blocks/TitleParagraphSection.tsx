import * as React from 'react'
import styled from 'react-emotion'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const Title = styled('h2')(
  ({ textAlign }: { textAlign: 'left' | 'center' }) => ({
    textAlign,
  }),
)

export interface TitleParagraphSectionProps extends BaseBlockProps {
  title: string
  titlePosition: string
  paragraph: MarkdownHtmlComponent
}

export const TitleParagraphSection: React.FunctionComponent<
  TitleParagraphSectionProps
> = (props) => (
  <div>
    <Title textAlign={props.titlePosition as 'left' | 'center'}>
      {props.title}
    </Title>
    <div
      dangerouslySetInnerHTML={{
        __html: props.paragraph.html,
      }}
    />
  </div>
)
