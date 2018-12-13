import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { SectionSize } from 'src/utils/SectionSize'
import { TextPosition } from 'src/utils/textPosition'
import { AppLink } from '../components/AppLink'
import { ButtonLink } from '../components/buttons'
import {
  getStoryblokImage,
  getStoryblokLinkUrl,
  Image as StoryblokImage,
} from '../utils/storyblok'

type TitleSize = 'sm' | 'lg'

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

const Title = styled('h2')(
  ({
    size,
    displayOrder,
  }: { size?: TitleSize } & { displayOrder: 'top' | 'bottom' }) => ({
    fontSize: size === 'lg' ? '4.5rem' : '2.5rem',
    width: '100%',
    maxWidth: '31rem',
    [TABLET_BP_DOWN]: {
      fontSize: size === 'lg' ? '3.75rem' : '2rem',
      marginTop: displayOrder === 'top' ? '3rem' : '1.414rem',
    },
  }),
)

const Paragraph = styled('div')({
  fontSize: '1.125rem',
  marginTop: '1.5rem',
  maxWidth: '31rem',
})

const Image = styled('img')(
  ({
    alignment,
    displayOrder,
  }: {
    alignment: string
    displayOrder: 'top' | 'bottom'
  }) => ({
    width: '40%',
    display: alignment === 'center' ? 'none' : 'block',
    [TABLET_BP_DOWN]: {
      maxWidth: '100%',
      width: 'auto',
      marginTop: displayOrder === 'top' ? '0' : '3rem',
      display: 'block',
      order: displayOrder === 'top' ? -1 : 'initial',
    },
  }),
)

interface ImageTextBlockProps extends BaseBlockProps {
  title_size?: TitleSize
  title: string
  paragraph: MarkdownHtmlComponent
  text_position: TextPosition
  button_title: string
  button_type: 'filled' | 'outlined'
  button_branch_link: boolean
  button_link: LinkComponent
  show_button: boolean
  image?: StoryblokImage
  background_image: string
  size: SectionSize
  media_position: 'top' | 'bottom'
}

export const ImageTextBlock: React.FunctionComponent<ImageTextBlockProps> = ({
  title_size,
  title,
  paragraph,
  text_position,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  show_button,
  image,
  background_image,
  color,
  size,
  media_position,
}) => {
  return (
    <SectionWrapper
      color={color && color.color}
      size={size}
      backgroundImage={background_image}
    >
      <AlignableContentWrapper textPosition={text_position}>
        <TextWrapper textPosition={text_position}>
          <Title size={title_size} displayOrder={media_position}>
            {title}
          </Title>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          {show_button &&
            (button_branch_link ? (
              <AppLink>
                {({ link, handleClick }) => (
                  <ButtonLinkWithMargin
                    href={link}
                    onClick={handleClick}
                    styleType={button_type}
                    size="sm"
                    bold
                  >
                    {button_title}
                  </ButtonLinkWithMargin>
                )}
              </AppLink>
            ) : (
              <ButtonLinkWithMargin
                href={getStoryblokLinkUrl(button_link)}
                styleType={button_type}
                size="sm"
                bold
              >
                {button_title}
              </ButtonLinkWithMargin>
            ))}
        </TextWrapper>
        {image && (
          <Image
            alignment={text_position}
            displayOrder={media_position}
            src={getStoryblokImage(image)}
          />
        )}
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
