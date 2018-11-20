import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import {
  BaseBlockProps,
  MarkdownHtmlComponent,
  NativeColorPickerComponent,
} from './BaseBlockProps'

const SectionBackgroundColorComponent = styled(SectionWrapper)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor,
  }),
)

const AlignableContentWrapperComponent = styled(ContentWrapper)(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'center' ? 'column' : 'row',
    justifyContent: textPosition === 'left' ? 'space-between' : 'center',
    alignItems: 'center',
    textAlign: textPosition === 'center' ? 'center' : 'left',
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
  title_color: NativeColorPickerComponent
  paragraph_color: NativeColorPickerComponent
  text_position: string
  paragraph: MarkdownHtmlComponent
  background_color: NativeColorPickerComponent
}

export const TitleParagraphBlock: React.SFC<TitleParagraphBlockInterface> = ({
  title,
  title_color,
  paragraph_color,
  text_position,
  paragraph,
  background_color,
}) => {
  return (
    <SectionBackgroundColorComponent backgroundColor={background_color.color}>
      <AlignableContentWrapperComponent textPosition={text_position}>
        <TitleComponent
          titleColor={title_color.color}
          textPosition={text_position}
        >
          {title}
        </TitleComponent>
        <ParagraphComponent
          paragraphColor={paragraph_color.color}
          textPosition={text_position}
          dangerouslySetInnerHTML={{
            __html: paragraph.html,
          }}
        />
      </AlignableContentWrapperComponent>
    </SectionBackgroundColorComponent>
  )
}
