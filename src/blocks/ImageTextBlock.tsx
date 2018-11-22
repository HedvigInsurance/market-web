import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

import { ButtonLink } from '../components/buttons'

const ButtonLinkWithMarginComponent = styled(ButtonLink)({
  marginTop: '1.7rem',
})

const AlignableContentWrapperComponent = styled(ContentWrapper)(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'right' ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

const TextWrapperComponent = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    textAlign: textPosition === 'center' ? 'center' : 'left',
    width: '100%',
    paddingRight: textPosition === 'left' ? '7rem' : '0',
    paddingLeft: textPosition === 'right' ? '7rem' : '0',
    [TABLET_BP_DOWN]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
)

const TitleComponent = styled('h2')({
  fontSize: '4.5rem',
  width: '100%',
  [TABLET_BP_DOWN]: {
    fontSize: '3.75rem',
  },
})

const ParagraphComponent = styled('div')({
  fontSize: '1.25rem',
  marginTop: '1.5rem',
})

const ImageComponent = styled('img')(
  ({ alignment }: { alignment: string }) => ({
    width: '40%',
    display: alignment === 'center' ? 'none' : 'block',
    [TABLET_BP_DOWN]: {
      width: '100%',
      marginTop: '3rem',
      display: 'block',
    },
  }),
)

interface ButtonLinkInterface {
  cached_url: string
  fieldtype: string
  id: string
  linktype: string
  url: string
}

interface ImageTextBlockInterface extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
  text_position: string
  button_title: string
  button_type: 'filled' | 'outlined'
  button_link: ButtonLinkInterface
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
  button_link,
  show_button,
  image,
  color,
}) => {
  return (
    <SectionWrapper color={color && color.color} size="xl">
      <AlignableContentWrapperComponent textPosition={text_position}>
        <TextWrapperComponent textPosition={text_position}>
          <TitleComponent>{title}</TitleComponent>
          <ParagraphComponent
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          {show_button && (
            <ButtonLinkWithMarginComponent
              href={button_link.url}
              type={button_type}
              size="sm"
              bold
            >
              {button_title}
            </ButtonLinkWithMarginComponent>
          )}
        </TextWrapperComponent>
        <ImageComponent alignment={text_position} src={image} />
      </AlignableContentWrapperComponent>
    </SectionWrapper>
  )
}
