import styled from '@emotion/styled'
import * as React from 'react'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import {
  ButtonLinkBrandPivot,
  buttonSizes,
} from 'components/ButtonBrandPivot/Button'
import { LinkComponent } from 'src/storyblok/StoryContainer'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import {
  BrandPivotBaseBlockProps,
  MinimalColorComponent,
} from '../BaseBlockProps'

export interface CtaBlockProps extends BrandPivotBaseBlockProps {
  cta_label: string
  cta_link: LinkComponent
  cta_color?: MinimalColorComponent
  cta_style?: 'filled' | 'outlined'
  cta_size?: keyof typeof buttonSizes
}

const ButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

export const CtaBlock: React.FC<CtaBlockProps> = ({
  color,
  index,
  size,
  cta_label,
  cta_link,
  cta_color,
  cta_style,
  cta_size,
}) => (
  <SectionWrapper brandPivot colorComponent={color} size={size}>
    <ContentWrapper brandPivot index={index}>
      <ButtonWrapper>
        <ButtonLinkBrandPivot
          href={getStoryblokLinkUrl(cta_link)}
          size={cta_size}
          color={cta_color?.color}
          fullWidth={true}
          styleType={cta_style}
        >
          {cta_label}
        </ButtonLinkBrandPivot>
      </ButtonWrapper>
    </ContentWrapper>
  </SectionWrapper>
)
