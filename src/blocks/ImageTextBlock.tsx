import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

import { SectionSize } from 'src/utils/utils/SectionSize'
import { TextPosition } from 'src/utils/utils/textPosition'
import { ButtonLink } from '../components/buttons'

const ButtonLinkWithMargin = styled(ButtonLink)({
  marginTop: '1.7rem',
})

const AlignableContentWrapper = styled(ContentWrapper)(
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

const TextWrapper = styled('div')(
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

const Title = styled('h2')({
  fontSize: '4.5rem',
  width: '100%',
  [TABLET_BP_DOWN]: {
    fontSize: '3.75rem',
  },
})

const Paragraph = styled('div')({
  fontSize: '1.125rem',
  marginTop: '1.5rem',
})

const Image = styled('img')(({ alignment }: { alignment: string }) => ({
  width: '40%',
  display: alignment === 'center' ? 'none' : 'block',
  [TABLET_BP_DOWN]: {
    width: '100%',
    marginTop: '3rem',
    display: 'block',
  },
}))

interface ButtonLinkProps {
  cached_url: string
  fieldtype: string
  id: string
  linktype: string
  url: string
}

interface ImageTextBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
  text_position: TextPosition
  button_title: string
  button_type: 'filled' | 'outlined'
  button_link: ButtonLinkProps
  show_button: boolean
  image: string
  size: SectionSize
}

export const ImageTextBlock: React.FunctionComponent<ImageTextBlockProps> = ({
  title,
  paragraph,
  text_position,
  button_title,
  button_type,
  button_link,
  show_button,
  image,
  color,
  size,
}) => {
  return (
    <SectionWrapper color={color && color.color} size={size}>
      <AlignableContentWrapper textPosition={text_position}>
        <TextWrapper textPosition={text_position}>
          <Title>{title}</Title>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          {show_button && (
            <ButtonLinkWithMargin
              href={button_link.url}
              type={button_type}
              size="sm"
              bold
            >
              {button_title}
            </ButtonLinkWithMargin>
          )}
        </TextWrapper>
        <Image alignment={text_position} src={image} />
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
