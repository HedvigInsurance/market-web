import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import {
  BaseBlockProps,
  MarkdownHtmlComponent,
  NativeColorPickerComponent,
} from './BaseBlockProps'

import {
  FilledButtonComponent,
  OutlinedButtonComponent,
} from '../components/Buttons'

const FilledButtonWithMarginComponent = styled(FilledButtonComponent)({
  marginTop: '3rem',
})

const OutlinedButtonWithMarginComponent = styled(OutlinedButtonComponent)({
  marginTop: '3rem',
})

const SectionBackgroundColorComponent = styled(SectionWrapper)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor,
  }),
)

const AlignableContentWrapperComponent = styled(ContentWrapper)(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'right' ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
)

const TextWrapperComponent = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    textAlign: textPosition === 'center' ? 'center' : 'left',
    width: '100%',
    paddingRight: textPosition === 'left' ? '7rem' : '0',
    paddingLeft: textPosition === 'right' ? '7rem' : '0',
  }),
)

const TitleComponent = styled('h2')(
  ({ titleColor }: { titleColor: string }) => ({
    color: titleColor,
    fontSize: '3rem',
  }),
)

const ParagraphComponent = styled('div')(
  ({ paragraphColor }: { paragraphColor: string }) => ({
    color: paragraphColor,
    fontSize: '1.25rem',
    marginTop: '1.5rem',
  }),
)

const Image = styled('img')({
  width: '40%',
})

interface ImageTextBlockInterface extends BaseBlockProps {
  title: string
  title_color: NativeColorPickerComponent
  paragraph: MarkdownHtmlComponent
  paragraph_color: NativeColorPickerComponent
  text_position: string
  button_title: string
  button_type: 'filled' | 'outlined'
  show_button: true | false
  image: string
  background_color: NativeColorPickerComponent
}

export const ImageTextBlock: React.SFC<ImageTextBlockInterface> = ({
  title,
  title_color,
  paragraph,
  paragraph_color,
  text_position,
  button_title,
  button_type,
  show_button,
  image,
  background_color,
}) => {
  const buttonComponents = {
    filled: FilledButtonWithMarginComponent,
    outlined: OutlinedButtonWithMarginComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[button_type]

  return (
    <SectionBackgroundColorComponent backgroundColor={background_color.color}>
      <AlignableContentWrapperComponent textPosition={text_position}>
        <TextWrapperComponent textPosition={text_position}>
          <TitleComponent titleColor={title_color.color}>
            {title}
          </TitleComponent>
          <ParagraphComponent
            paragraphColor={paragraph_color.color}
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          {show_button && <ButtonComponent>{button_title}</ButtonComponent>}
        </TextWrapperComponent>
        {text_position !== 'center' && <Image src={image} />}
      </AlignableContentWrapperComponent>
    </SectionBackgroundColorComponent>
  )
}
