import styled from '@emotion/styled'
import * as React from 'react'
import {
  BaseBlockProps,
  ColorComponent,
  MarkdownHtmlComponent,
} from './BaseBlockProps'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { SectionSize } from 'src/utils/SectionSize'
import { TextPosition } from 'src/utils/textPosition'
import { ButtonLink, ButtonWeight } from '../components/buttons'
import { LazyLottie } from '../components/LazyLottie'

import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'

import { AppLink } from '../components/AppLink'
import { getStoryblokLinkUrl } from '../utils/storyblok'

const ButtonLinkWithMargin = styled(ButtonLink)({
  marginTop: '1.7rem',
})

interface WithTextPosition {
  textPosition: TextPosition
}
const AlignableContentWrapper = styled(ContentWrapper)<WithTextPosition>(
  ({ textPosition }) => ({
    display: 'flex',
    flexDirection: textPosition === 'right' ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

const TextWrapper = styled('div')<WithTextPosition>(({ textPosition }) => ({
  textAlign: textPosition === 'center' ? 'center' : 'left',
  width: '100%',
  paddingRight: textPosition === 'left' ? '7rem' : '0',
  paddingLeft: textPosition === 'right' ? '7rem' : '0',
  [TABLET_BP_DOWN]: {
    paddingRight: 0,
    paddingLeft: 0,
  },
}))

const Title = styled('h2')<{ displayorder: 'top' | 'bottom' }>(
  ({ displayorder }) => ({
    fontSize: '4.5rem',
    wordWrap: 'break-word',
    width: '100%',
    [TABLET_BP_DOWN]: {
      fontSize: '3.75rem',
      marginTop: displayorder === 'top' ? '3rem' : '1.414rem',
    },
  }),
)

const Paragraph = styled('div')({
  fontSize: '1.125rem',
  wordWrap: 'break-word',
  marginTop: '1.5rem',
})

const PhoneContainer = styled('div')<{
  alignment: string
  displayorder: 'top' | 'bottom'
}>(({ alignment, displayorder }) => ({
  padding: '0 30px',
  width: '100%',
  '&:>div': {
    width: '100%',
  },
  display: alignment === 'center' ? 'none' : 'block',
  [TABLET_BP_DOWN]: {
    maxWidth: '100%',
    width: 'auto',
    marginTop: displayorder === 'top' ? '0' : '3rem',
    display: 'block',
    order: displayorder === 'top' ? -1 : undefined,
  },
}))

interface AnimatedPhoneBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
  text_position: TextPosition
  button_title: string
  button_type: 'filled' | 'outlined'
  button_branch_link: boolean
  button_link: LinkComponent
  show_button: boolean
  size: SectionSize
  media_position: 'top' | 'bottom'
  button_color: ColorComponent
  button_weight: ButtonWeight
}

export const AnimatedPhoneBlock: React.FunctionComponent<AnimatedPhoneBlockProps> = ({
  title,
  paragraph,
  text_position,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  show_button,
  color,
  media_position,
  button_color,
  button_weight,
  size,
}) => {
  return (
    <SectionWrapper color={color && color.color} size={size}>
      <AlignableContentWrapper textPosition={text_position}>
        <TextWrapper textPosition={text_position}>
          <Title displayorder={media_position}>{title}</Title>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph && paragraph.html,
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
                    color={button_color && button_color.color}
                    weight={button_weight}
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
                color={button_color && button_color.color}
                weight={button_weight}
              >
                {button_title}
              </ButtonLinkWithMargin>
            ))}
        </TextWrapper>
        <PhoneContainer alignment={text_position} displayorder={media_position}>
          <LazyLottie
            options={{
              animationData: import(
                /* webpackChunkName: "chat-demo" */ 'animations/chatDemo.json'
              ),
            }}
          />
        </PhoneContainer>
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
