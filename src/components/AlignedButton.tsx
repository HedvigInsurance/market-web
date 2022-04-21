import styled from '@emotion/styled'
import React from 'react'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { MinimalColorComponent } from '../blocks/BaseBlockProps'
import { TABLET_BP_DOWN } from '../components/blockHelpers'
import { ButtonLink, buttonSizes } from '../components/Button/Button'

import { getStoryblokLinkUrl } from '../utils/storyblok'

const ButtonLinkWithMargin = styled(ButtonLink)<{
  mobilePosition?: 'above' | 'below'
}>(({ mobilePosition }) => ({
  marginTop: '1.7rem',
  [TABLET_BP_DOWN]: {
    order: mobilePosition === 'below' ? 100 : 'initial',
  },
}))

export interface AlignedButtonProps<TColor> {
  title: string
  type: 'filled' | 'outlined'
  buttonLink?: LinkComponent
  show: boolean
  color?: TColor
  size?: keyof typeof buttonSizes
  positionMobile?: 'above' | 'below'
  className?: string
}

export const AlignedButton: React.FunctionComponent<
  AlignedButtonProps<MinimalColorComponent>
> = ({
  title,
  type,
  buttonLink,
  show,
  color,
  size,
  positionMobile,
  className,
}) => {
  return (
    <>
      {show && buttonLink && (
        <ButtonLinkWithMargin
          href={getStoryblokLinkUrl(buttonLink)}
          styleType={type}
          size={size ? size : 'sm'}
          color={color?.color}
          mobilePosition={positionMobile}
          className={className}
        >
          {title}
        </ButtonLinkWithMargin>
      )}
    </>
  )
}
