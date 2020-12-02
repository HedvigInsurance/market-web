import styled from '@emotion/styled'
import React from 'react'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { ColorComponent, MinimalColorComponent } from '../blocks/BaseBlockProps'
import { TABLET_BP_DOWN } from '../components/blockHelpers'
import { ButtonLinkBrandPivot } from '../components/ButtonBrandPivot/Button'
import {
  ButtonLink,
  ButtonProps,
  buttonSizes,
  ButtonWeight,
} from '../components/buttons'

import { getStoryblokLinkUrl } from '../utils/storyblok'

type ButtonComponentProps<TColor> = ButtonProps<TColor> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

const createButtonLinkWithMargin = <TColor extends string>(
  ButtonComponent: React.ComponentType<ButtonComponentProps<TColor>>,
) =>
  styled(ButtonComponent)<{
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
  weight?: ButtonWeight
  positionMobile?: 'above' | 'below'
  className?: string
}

export const AlignedButton: React.FunctionComponent<
  AlignedButtonProps<MinimalColorComponent | ColorComponent>
> = ({
  title,
  type,
  buttonLink,
  show,
  color,
  size,
  weight,
  positionMobile,
  className,
}) => {
  const ButtonLinkWithMargin =
    color?.plugin === 'hedvig_minimal_color_picker'
      ? createButtonLinkWithMargin(ButtonLinkBrandPivot)
      : createButtonLinkWithMargin(ButtonLink)

  return (
    <>
      {show && buttonLink && (
        <ButtonLinkWithMargin
          href={getStoryblokLinkUrl(buttonLink)}
          styleType={type}
          size={size ? size : 'sm'}
          color={color?.color as any}
          weight={weight}
          mobilePosition={positionMobile}
          className={className}
        >
          {title}
        </ButtonLinkWithMargin>
      )}
    </>
  )
}
