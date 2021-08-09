import React from 'react'
import {
  buttonSizes,
  ButtonStyleType,
} from 'components/ButtonBrandPivot/Button'
import { LinkComponent } from 'storyblok/StoryContainer'
import { SectionSize } from 'utils/SectionSize'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import { MinimalColorComponent } from '../BaseBlockProps'
import CallToActionBlock from './Component'

interface Props {
  color?: MinimalColorComponent
  size?: SectionSize
  cta_label: string
  cta_link: LinkComponent
  cta_color?: MinimalColorComponent
  cta_style?: Exclude<ButtonStyleType, 'plain'>
  cta_size?: keyof typeof buttonSizes
}

const CallToActionBlockContainer: React.FC<Props> = ({
  color,
  size,
  cta_label,
  cta_color,
  cta_style,
  cta_size,
  cta_link,
}) => (
  <CallToActionBlock.Wrapper background={color?.color} size={size}>
    <CallToActionBlock.Button
      color={cta_color?.color}
      styleType={cta_style}
      size={cta_size}
      href={getStoryblokLinkUrl(cta_link)}
    >
      {cta_label}
    </CallToActionBlock.Button>
  </CallToActionBlock.Wrapper>
)

export default CallToActionBlockContainer
