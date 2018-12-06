import * as React from 'react'
import styled from 'react-emotion'
import { LinkComponent } from 'src/storyblok/StoryContainer'
import { CenterLeftTextPosition } from 'src/utils/textPosition'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { ButtonLink, ButtonType } from '../components/buttons'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import { BaseBlockProps } from './BaseBlockProps'
import { AppLink } from '../components/AppLink'

const ButtonLinkWithMargin = styled(ButtonLink)({
  marginTop: '1.7rem',
  flexShrink: 0,
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
  paddingRight: alignment === 'left' ? '7rem' : 0,
  [TABLET_BP_DOWN]: {
    paddingRight: alignment === 'left' ? '3rem' : 0,
  },
  [MOBILE_BP_DOWN]: {
    fontSize: '2.5rem',
    paddingRight: 0,
  },
}))

interface TitleCtaBlockInterface extends BaseBlockProps {
  _uid: string
  title: string
  text_position: CenterLeftTextPosition
  button_title: string
  button_type: ButtonType
  button_branch_link: boolean
  button_link: LinkComponent
  show_button: boolean
}

export const TitleCtaBlock: React.FunctionComponent<TitleCtaBlockInterface> = ({
  title,
  text_position,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  color,
}) => {
  return (
    <SectionWrapper color={color && color.color}>
      <FlexboxContentWrapperComponent contentAlignment={text_position}>
        <TitleComponent alignment={text_position}>{title}</TitleComponent>
        {button_branch_link ? (
          <AppLink>
            {({ link, handleClick }) => (
              <ButtonLinkWithMargin
                href={link}
                onClick={handleClick}
                type={button_type}
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
            type={button_type}
            size="sm"
            bold
          >
            {button_title}
          </ButtonLinkWithMargin>
        )}
      </FlexboxContentWrapperComponent>
    </SectionWrapper>
  )
}
