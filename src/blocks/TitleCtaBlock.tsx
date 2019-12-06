import styled from '@emotion/styled'
import * as React from 'react'
import { LinkComponent } from 'src/storyblok/StoryContainer'
import { CenterLeftTextPosition } from 'src/utils/textPosition'
import { AppLink } from '../components/AppLink'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import {
  ButtonLink,
  ButtonStyleType,
  ButtonWeight,
} from '../components/buttons'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import { BaseBlockProps, ColorComponent } from './BaseBlockProps'

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

const FlexboxContentWrapperComponent = styled(ContentWrapper)<{
  contentAlignment: CenterLeftTextPosition
}>(({ contentAlignment }) => ({
  display: 'flex',
  width: '100%',
  ...contentPositionSylingMap[contentAlignment],
  [TABLET_BP_DOWN]: {
    flexDirection: 'column',
  },
}))

const TitleComponent = styled('h2')<{ alignment: string }>(({ alignment }) => ({
  fontSize: '3rem',
  paddingRight: alignment === 'left' ? '7rem' : 0,
  margin: 0,
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
  button_type: ButtonStyleType
  button_branch_link: boolean
  button_link: LinkComponent
  show_button: boolean
  button_color?: ColorComponent
  button_weight?: ButtonWeight
}

export const TitleCtaBlock: React.FunctionComponent<TitleCtaBlockInterface> = ({
  title,
  text_position,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  color,
  button_color,
  button_weight,
  size,
}) => {
  return (
    <SectionWrapper color={color && color.color} size={size}>
      <FlexboxContentWrapperComponent contentAlignment={text_position}>
        <TitleComponent alignment={text_position}>{title}</TitleComponent>
        {button_branch_link ? (
          <AppLink>
            {({ link, handleClick }) => (
              <ButtonLinkWithMargin
                href={link}
                onClick={handleClick}
                styleType={button_type}
                size="sm"
                weight={button_weight}
                color={button_color && button_color.color}
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
            weight={button_weight}
            color={button_color && button_color.color}
          >
            {button_title}
          </ButtonLinkWithMargin>
        )}
      </FlexboxContentWrapperComponent>
    </SectionWrapper>
  )
}
