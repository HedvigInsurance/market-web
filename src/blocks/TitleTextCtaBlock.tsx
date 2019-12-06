import styled from '@emotion/styled'
import * as React from 'react'
import {
  ContentWrapper,
  getColorStyles,
  MarginSectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import {
  BaseBlockProps,
  ColorComponent,
  MarkdownHtmlComponent,
} from './BaseBlockProps'

import { LinkComponent } from 'src/storyblok/StoryContainer'
import { SectionSize } from 'src/utils/SectionSize'
import { TextPosition } from 'src/utils/textPosition'
import { AlignedButton } from '../components/AlignedButton'
import { buttonSizes, ButtonWeight } from '../components/buttons'

type TitleSize = 'sm' | 'lg'

const AlignableContentWrapper = styled(ContentWrapper)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'top',
  [TABLET_BP_DOWN]: {
    flexDirection: 'column',
  },
})

const TextCtaWrapper = styled('div')({
  width: '100%',
  [TABLET_BP_DOWN]: {
    paddingRight: 0,
    paddingLeft: 0,
  },
})

const Title = styled('h2')<{ size?: TitleSize; color: string }>(
  ({ size, color }) => ({
    fontSize: size === 'lg' ? '4.5rem' : '2.5rem',
    width: '100%',
    color,
    marginRight: '1em',
    [TABLET_BP_DOWN]: {
      fontSize: size === 'lg' ? '2.75rem' : '2rem',
    },
  }),
)

const Paragraph = styled('div')({
  fontSize: '1.126rem',
  marginTop: '1.5rem',
  maxWidth: '31rem',
  [TABLET_BP_DOWN]: {
    maxWidth: '100%',
  },
})

interface TitleTextCtaBlockProps extends BaseBlockProps {
  title_size?: TitleSize
  title: string
  title_color?: ColorComponent
  paragraph: MarkdownHtmlComponent
  text_position: TextPosition
  text_position_mobile: TextPosition
  button_title: string
  button_type: 'filled' | 'outlined'
  button_branch_link: boolean
  button_link: LinkComponent
  show_button: boolean
  background_image: string
  size: SectionSize
  media_position: 'top' | 'bottom'
  button_color?: ColorComponent
  button_size?: keyof typeof buttonSizes
  button_weight?: ButtonWeight
  button_position_mobile?: 'above' | 'below'
}

export const TitleTextCtaBlock: React.FunctionComponent<TitleTextCtaBlockProps> = ({
  title_size,
  title,
  title_color,
  paragraph,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  show_button,
  background_image,
  color,
  size,
  button_color,
  button_size,
  button_weight,
}) => {
  return (
    <MarginSectionWrapper
      color={color && color.color}
      size={size}
      backgroundImage={background_image}
    >
      <AlignableContentWrapper>
        <Title
          size={title_size}
          color={
            title_color && title_color.color !== 'standard'
              ? getColorStyles(title_color.color).background
              : color
              ? getColorStyles(color.color).color
              : 'standard'
          }
        >
          {title}
        </Title>
        <TextCtaWrapper>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
          />
          <AlignedButton
            title={button_title}
            type={button_type}
            branchLink={button_branch_link}
            buttonLink={button_link}
            show={show_button}
            color={button_color}
            size={button_size ? button_size : 'sm'}
            weight={button_weight}
          />
        </TextCtaWrapper>
      </AlignableContentWrapper>
    </MarginSectionWrapper>
  )
}
