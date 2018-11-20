import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

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

const TitleComponent = styled('h2')({
  fontSize: '3rem',
  width: '100%',
})

const ParagraphComponent = styled('div')({
  fontSize: '1.25rem',
  marginTop: '1.5rem',
})

const ImageComponent = styled('img')({
  width: '40%',
})

interface ImageTextBlockInterface extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
  text_position: string
  button_title: string
  button_type: 'filled' | 'outlined'
  show_button: true | false
  image: string
}

export const ImageTextBlock: React.FunctionComponent<
  ImageTextBlockInterface
> = ({
  title,
  paragraph,
  text_position,
  button_title,
  button_type,
  show_button,
  image,
  color,
}) => {
  const buttonComponents = {
    filled: FilledButtonWithMarginComponent,
    outlined: OutlinedButtonWithMarginComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[button_type]

  return (
    <SectionWrapper color={color && color.color}>
      <AlignableContentWrapperComponent textPosition={text_position}>
        <TextWrapperComponent textPosition={text_position}>
          <TitleComponent>{title}</TitleComponent>
          <ParagraphComponent
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          {show_button && <ButtonComponent>{button_title}</ButtonComponent>}
        </TextWrapperComponent>
        {text_position !== 'center' && <ImageComponent src={image} />}
      </AlignableContentWrapperComponent>
    </SectionWrapper>
  )
}
