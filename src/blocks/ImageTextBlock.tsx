import * as React from 'react'
import styled from 'react-emotion'
import { MaxWidthContainerComponent } from '../components/blockHelpers'
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
  marginTop: '47px',
})

const OutlinedButtonWithMarginComponent = styled(OutlinedButtonComponent)({
  marginTop: '47px',
})

const SectionComponent = styled('section')(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    width: '100%',
    background: backgroundColor,
    paddingTop: '120px',
    paddingBottom: '120px',
  }),
)

const ContentContainer = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'right' ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }),
)

const TextContainer = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    textAlign: textPosition === 'center' ? 'center' : 'left',
    width: '100%',
    paddingRight: textPosition === 'left' ? '120px' : '0',
    paddingLeft: textPosition === 'right' ? '120px' : '0',
  }),
)

const TitleComponent = styled('h2')(
  ({ titleColor }: { titleColor: string }) => ({
    color: titleColor,
    fontSize: '48px',
  }),
)

const ParagraphComponent = styled('div')(
  ({ paragraphColor }: { paragraphColor: string }) => ({
    color: paragraphColor,
    fontSize: '20px',
    marginTop: '25px',
  }),
)

const ImageComponent = styled('img')({
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
    <SectionComponent backgroundColor={background_color.color}>
      <MaxWidthContainerComponent>
        <ContentContainer className="Container" textPosition={text_position}>
          <TextContainer textPosition={text_position}>
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
          </TextContainer>
          {text_position !== 'center' && <ImageComponent src={image} />}
        </ContentContainer>
      </MaxWidthContainerComponent>
    </SectionComponent>
  )
}
