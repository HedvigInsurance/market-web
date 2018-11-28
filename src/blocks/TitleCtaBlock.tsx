import * as React from 'react'
import styled from 'react-emotion'
import { LinkComponent } from 'src/storyblok/StoryContainer'
import { CenterLeftTextPosition } from 'src/utils/textPosition'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { ButtonLink, ButtonType } from '../components/buttons'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import { BaseBlockProps } from './BaseBlockProps'

const ButtonLinkWithMargin = styled(ButtonLink)({
  marginTop: '1.7rem',
})

const contentPositionSylingMap: { center: object; left: object } = {
  center: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'start',
    textAlign: 'left',
  },
}

const FlexboxContentWrapperComponent = styled(ContentWrapper)(
  ({ contentAlignment }: { contentAlignment: CenterLeftTextPosition }) => ({
    display: 'flex',
    width: '100%',
    ...contentPositionSylingMap[contentAlignment],
    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

const TitleComponent = styled('h2')(({ alignment }: { alignment: string }) => ({
  fontSize: '3rem',
  paddingRight: alignment === 'left' ? '7rem' : '0',
}))

interface TitleCtaBlockInterface extends BaseBlockProps {
  _uid: string
  title: string
  text_position: CenterLeftTextPosition
  button_title: string
  button_type: ButtonType
  button_link: LinkComponent
  show_button: boolean
}

export const TitleCtaBlock: React.FunctionComponent<TitleCtaBlockInterface> = ({
  title,
  text_position,
  button_title,
  button_type,
  button_link,
  color,
}) => {
  return (
    <SectionWrapper color={color && color.color}>
      <FlexboxContentWrapperComponent contentAlignment={text_position}>
        <TitleComponent alignment={text_position}>{title}</TitleComponent>
        <ButtonLinkWithMargin
          href={getStoryblokLinkUrl(button_link)}
          type={button_type}
          size="sm"
          bold
        >
          {button_title}
        </ButtonLinkWithMargin>
      </FlexboxContentWrapperComponent>
    </SectionWrapper>
  )
}
