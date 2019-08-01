import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
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

const AlignableContentWrapper = styled(ContentWrapper)(
  ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'top',
    [TABLET_BP_DOWN]: {
      flexDirection: 'column',
    },
  }),
)

const TextCtaWrapper = styled('div')(
  ({
    width: '100%',
    [TABLET_BP_DOWN]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
)

const Title = styled('h2')(
  ({
    size
  }: {
    size?: TitleSize
  }) => ({
    fontSize: size === 'lg' ? '4.5rem' : '2.5rem',
    width: '100%',
    marginRight: '1em',
    [TABLET_BP_DOWN]: {
      fontSize: size === 'lg' ? '3.75rem' : '2rem',
    },
  }),
)

const Paragraph = styled('div')(
  ({ textPosition }: { textPosition: TextPosition }) => ({
    margin: textPosition === 'center' ? 'auto' : undefined,
    fontSize: '1.125rem',
    marginTop: '1.5rem',
    maxWidth: textPosition === 'center' ? '40rem' : '31rem',
    [TABLET_BP_DOWN]: {
      maxWidth: '100%',
    },
  }),
)

interface TitleTextCtaBlockProps extends BaseBlockProps {
  title_size?: TitleSize
  title: string
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

export const TitleTextCtaBlock: React.FunctionComponent<
  TitleTextCtaBlockProps
> = ({
  title_size,
  title,
  paragraph,
  text_position,
  text_position_mobile,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  show_button,
  background_image,
  color,
  size,
  media_position,
  button_color,
  button_size,
  button_weight,
  button_position_mobile,
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
          >
            {title}
          </Title>
        <TextCtaWrapper>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
            textPosition={text_position}
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
          positionMobile={button_position_mobile}
        />
        </TextCtaWrapper>
      </AlignableContentWrapper>
    </MarginSectionWrapper>
  )
}
