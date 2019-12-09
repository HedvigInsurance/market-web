import styled from '@emotion/styled'
import * as React from 'react'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { ColorComponent } from '../blocks/BaseBlockProps'
import { AppLink } from '../components/AppLink'
import { TABLET_BP_DOWN } from '../components/blockHelpers'
import { ButtonLink, buttonSizes, ButtonWeight } from '../components/buttons'

import { getStoryblokLinkUrl } from '../utils/storyblok'

const ButtonLinkWithMargin = styled(ButtonLink)<{
  mobilePosition?: 'above' | 'below'
}>(({ mobilePosition }) => ({
  marginTop: '1.7rem',
  [TABLET_BP_DOWN]: {
    order: mobilePosition === 'below' ? 100 : 'initial',
  },
}))

export interface AlignedButtonProps {
  title: string
  type: 'filled' | 'outlined'
  branchLink: boolean
  buttonLink: LinkComponent
  show: boolean
  color?: ColorComponent
  size?: keyof typeof buttonSizes
  weight?: ButtonWeight
  positionMobile?: 'above' | 'below'
  className?: string
}

export const AlignedButton: React.FunctionComponent<AlignedButtonProps> = ({
  title,
  type,
  branchLink,
  buttonLink,
  show,
  color,
  size,
  weight,
  positionMobile,
  className,
}) => {
  return (
    <>
      {show &&
        (branchLink ? (
          <AppLink>
            {({ link, handleClick }) => (
              <ButtonLinkWithMargin
                href={link}
                onClick={handleClick}
                styleType={type}
                size={size ? size : 'sm'}
                color={color && color.color}
                weight={weight}
                mobilePosition={positionMobile}
                className={className}
              >
                {title}
              </ButtonLinkWithMargin>
            )}
          </AppLink>
        ) : (
          <ButtonLinkWithMargin
            href={getStoryblokLinkUrl(buttonLink)}
            styleType={type}
            size={size ? size : 'sm'}
            color={color && color.color}
            weight={weight}
            mobilePosition={positionMobile}
            className={className}
          >
            {title}
          </ButtonLinkWithMargin>
        ))}
    </>
  )
}
