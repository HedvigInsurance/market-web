import * as React from 'react'
import styled from 'react-emotion'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const SectionComponent = styled('section')(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    width: '100%',
    background: backgroundColor,
    paddingTop: '120px',
    paddingBottom: '120px',
  }),
)

const ContentComponent = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'center' ? 'column' : 'row',
    justifyContent: textPosition === 'left' ? 'space-between' : 'center',
    alignItems: 'center',
    textAlign: textPosition === 'center' ? 'center' : 'left',
    width: '100%',
  }),
)

const TitleComponent = styled('h2')(
  ({
    titleColor,
    textPosition,
  }: {
    titleColor: string
    textPosition: string
  }) => ({
    color: titleColor,
    fontSize: '48px',
    marginRight: textPosition === 'left' ? 'auto' : 0,
    marginLeft: textPosition === 'right' ? 'auto' : 0,
    width: '100%',
    maxWidth: '50%',
  }),
)

const ParagraphComponent = styled('div')(
  ({
    paragraphColor,
    textPosition,
  }: {
    paragraphColor: string
    textPosition: string
  }) => ({
    display: textPosition === 'right' ? 'none' : 'block',
    marginTop: textPosition === 'center' ? '25px' : 0,
    maxWidth: textPosition === 'left' ? '40%' : '100%',
    width: '100%',
    color: paragraphColor,
    fontSize: '20px',
  }),
)

interface TitleParagraphBlockInterface extends BaseBlockProps {
  title: string
  titleColor: string
  paragraphColor: string
  textPosition: string
  paragraph: MarkdownHtmlComponent
  backgroundColor: string
}

export const TitleParagraphBlock: React.SFC<TitleParagraphBlockInterface> = ({
  title = '',
  titleColor = '',
  paragraphColor = '',
  textPosition = '',
  paragraph = {},
  backgroundColor = '',
}) => {
  return (
    <SectionComponent backgroundColor={backgroundColor}>
      <ContentComponent className="Container" textPosition={textPosition}>
        <TitleComponent titleColor={titleColor} textPosition={textPosition}>
          {title}
        </TitleComponent>
        <ParagraphComponent
          paragraphColor={paragraphColor}
          textPosition={textPosition}
          dangerouslySetInnerHTML={{
            __html: paragraph.html,
          }}
        />
      </ContentComponent>
    </SectionComponent>
  )
}
