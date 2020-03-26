import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { HedvigH } from 'components/icons/HedvigH'
import React from 'react'
import MediaQuery from 'react-responsive'
import { LinkComponent } from 'src/storyblok/StoryContainer'
import { SectionSize } from 'src/utils/SectionSize'
import { TextPosition } from 'src/utils/textPosition'
import {
  AlignedButton,
  AlignedButtonProps,
} from '../../components/AlignedButton'
import {
  ContentWrapper,
  getMinimalColorStyles,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
  TABLET_BP_UP
} from '../../components/blockHelpers'
import { DeferredImage } from '../../components/DeferredImage'
import { DeferredVideo } from '../../components/DeferredVideo'
import {
  getStoryblokImage,
  Image as StoryblokImage,
} from '../../utils/storyblok'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from '../BaseBlockProps'
import { BackgroundVideo } from './BackgroundVideo'

type TitleSize = 'sm' | 'lg'
interface Animateable {
  animate?: boolean
}

const AlignableContentWrapper = styled(ContentWrapper)<{
  textPosition: TextPosition
}>(({ textPosition }) => ({
  display: 'flex',
  position: 'relative',
  flexDirection:
    textPosition === 'right'
      ? 'row-reverse'
      : textPosition === 'center'
      ? 'column'
      : 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  [MOBILE_BP_DOWN]: {
    flexDirection: 'column',
  },
}))

const fadeSlideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(15%)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})
const AnimatedAlignedButton = styled(AlignedButton)<
  Animateable & AlignedButtonProps<MinimalColorComponent>
>(({ animate }) => ({
  opacity: animate ? 0 : 1,
  animation: animate ? fadeSlideIn + ' 1000ms ease-out forwards' : undefined,
  animationDelay: '1000ms',
}))

const TextWrapper = styled('div')<{
  textPosition: TextPosition
  textPositionMobile: TextPosition
}>(({ textPosition, textPositionMobile }) => ({
  position: 'relative',
  textAlign: textPosition === 'center' ? 'center' : 'left',
  width: '100%',
  paddingRight: textPosition === 'left' ? '7rem' : '0',
  paddingLeft: textPosition === 'right' ? '7rem' : '0',
  flexShrink: 1,
  [TABLET_BP_DOWN]: {
    paddingRight: textPosition === 'left' ? '3rem' : '0',
    paddingLeft: textPosition === 'right' ? '3rem' : '0',
  },
  [MOBILE_BP_DOWN]: {
    paddingRight: 0,
    paddingLeft: 0,
    textAlign: textPositionMobile,
  },
}))

type DisplayOrder = 'top' | 'bottom'

interface TitleProps {
  size?: TitleSize
  alignment: string
  displayorder: DisplayOrder
  textPosition: TextPosition
  color: string
}

const Title = styled('h2')<TitleProps & Animateable>(
  ({ size, displayorder, textPosition, alignment, color, animate }) => ({
    margin: textPosition === 'center' ? 'auto' : undefined,
    fontSize: size === 'lg' ? '4.5rem' : '3.5rem',
    marginTop:
      alignment === 'center' && displayorder === 'top' ? '3rem' : '1.414rem',
    width: '100%',
    color,
    maxWidth: textPosition === 'center' ? '40rem' : '31rem',
    opacity: animate ? 0 : 1,
    animation: animate ? fadeSlideIn + ' 500ms forwards' : undefined,
    animationDelay: '1000ms',

    [TABLET_BP_DOWN]: {
      fontSize: size === 'lg' ? '2.75rem' : '2rem',
      maxWidth: '100%',
      marginTop: displayorder === 'top' ? '3rem' : '1.414rem',
    },
  }),
)

const Paragraph = styled('div')<{ textPosition: TextPosition } & Animateable>(
  ({ textPosition, animate }) => ({
    margin: textPosition === 'center' ? 'auto' : undefined,
    fontSize: '1.125rem',
    marginTop: '1.5rem',
    maxWidth: textPosition === 'center' ? '40rem' : '31rem',
    opacity: animate ? 0 : 1,
    animation: animate ? fadeSlideIn + ' 500ms forwards' : undefined,
    animationDelay: '1250ms',

    [TABLET_BP_DOWN]: {
      maxWidth: '100%',
    },
  }),
)

const Image = styled(DeferredImage)<{
  alignment: string
  displayorder: DisplayOrder
}>(({ alignment, displayorder }) => ({
  width: 'calc(50% - .75rem)',
  display: 'block',
  flexShrink: 0,
  order: alignment === 'center' && displayorder === 'top' ? -1 : 'initial',
  borderRadius: 8,
  overflow: 'hidden',
  [MOBILE_BP_DOWN]: {
    maxWidth: '100%',
    width: 'auto',
    marginTop: displayorder === 'top' ? '0' : '3rem',
    display: 'block',
    order: displayorder === 'top' ? -1 : 'initial',
  },
}))

const ImageVideoWrapper = styled('div')<{
  alignment: string
  displayorder: DisplayOrder
}>(({ alignment, displayorder }) => ({
  width: 'calc(50% - 0.75rem)',
  flexShrink: 0,
  display: 'block',
  order: alignment === 'center' && displayorder === 'top' ? -1 : 'initial',
  borderRadius: 8,
  overflow: 'hidden',
  [MOBILE_BP_DOWN]: {
    maxWidth: '100%',
    width: 'auto',
    marginTop: displayorder === 'top' ? '0' : '3rem',
    display: 'block',
    order: displayorder === 'top' ? -1 : 'initial',
  },
}))

const ImageVideo = styled(DeferredVideo)({
  width: '100%',
  objectFit: 'cover',
  transition: 'height 1500ms',
  overflow: 'hidden',
  borderRadius: 0.01,
})

const Wordmark = styled('div')({
  display: 'inline-flex',
  position: 'absolute',
  marginTop: '0.2rem',
  marginLeft: '0.2rem',

  ['svg']: {
    width: '1.25rem',
    height: '1.25rem',
  },

  [TABLET_BP_UP]: {
    marginLeft: '0.5rem',
    ['svg']: {
      width: '2rem',
      height: '2rem',
    },
  },
})

interface ImageTextBlockProps extends BrandPivotBaseBlockProps {
  animate?: boolean
  title_size?: TitleSize
  title: string
  title_color?: MinimalColorComponent
  show_hedvig_wordmark?: boolean
  paragraph: MarkdownHtmlComponent
  text_position: TextPosition
  text_position_mobile: TextPosition
  button_title: string
  button_type: 'filled' | 'outlined'
  button_branch_link: boolean
  button_link: LinkComponent
  show_button: boolean
  image_type: 'image' | 'video'
  image?: StoryblokImage
  use_image_link: boolean
  image_link: LinkComponent
  image_video_file_location?: string
  mobile_image_video_file_location?: string
  background_type: string
  background_image: string
  background_video_file_location: string
  mobile_background_video_file_location: string
  size: SectionSize
  media_position: DisplayOrder
  button_color?: MinimalColorComponent
  button_position_mobile?: 'above' | 'below'
}

export const ImageTextBlockBrandPivot: React.FunctionComponent<ImageTextBlockProps> = ({
  animate,
  extra_styling,
  title_size,
  title,
  title_color,
  paragraph,
  text_position,
  text_position_mobile,
  button_title,
  button_type,
  button_branch_link,
  button_link,
  show_button,
  image_type,
  image,
  image_video_file_location,
  mobile_image_video_file_location,
  background_type,
  background_image,
  background_video_file_location,
  mobile_background_video_file_location,
  color,
  size,
  media_position,
  button_color,
  button_position_mobile,
  index,
  show_hedvig_wordmark,
}) => {
  return (
    <SectionWrapper
      brandPivot
      colorComponent={color}
      size={size}
      backgroundImage={background_type !== 'video' ? background_image : 'none'}
      extraStyling={extra_styling}
    >
      {background_type === 'video' &&
        background_video_file_location &&
        mobile_background_video_file_location && (
          <BackgroundVideo
            desktopImage={background_video_file_location}
            mobileImage={mobile_background_video_file_location}
            baseVideoUrl={background_video_file_location}
            baseMobileVideoUrl={mobile_background_video_file_location}
            backgroundColor="standard"
          />
        )}

      <AlignableContentWrapper textPosition={text_position} index={index}>
        <TextWrapper
          textPosition={text_position}
          textPositionMobile={text_position_mobile}
        >
          <Title
            size={title_size}
            displayorder={media_position}
            alignment={text_position}
            color={
              title_color && title_color.color !== 'standard'
                ? getMinimalColorStyles(title_color.color).background
                : color
                ? getMinimalColorStyles(color.color).color
                : 'standard'
            }
            textPosition={text_position}
            animate={animate}
          >
            {title}
            {show_hedvig_wordmark && (
              <Wordmark>
                <HedvigH />
              </Wordmark>
            )}
          </Title>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
            textPosition={text_position}
            animate={animate}
          />
          <MediaQuery query="(min-width: 481px)">
            <AnimatedAlignedButton
              title={button_title}
              type={button_type}
              branchLink={button_branch_link}
              buttonLink={button_link}
              show={show_button}
              color={button_color}
              positionMobile={button_position_mobile}
              animate={animate}
            />
          </MediaQuery>
        </TextWrapper>
        <MediaQuery query="(max-width: 480px)">
          <AnimatedAlignedButton
            title={button_title}
            type={button_type}
            branchLink={button_branch_link}
            buttonLink={button_link}
            show={show_button}
            color={button_color}
            positionMobile={button_position_mobile}
            animate={animate}
          />
        </MediaQuery>
        {image && image_type !== 'video' ? (
          <Image
            alignment={text_position}
            displayorder={media_position}
            src={getStoryblokImage(image)}
          />
        ) : (
          image_type === 'video' &&
          image_video_file_location &&
          mobile_image_video_file_location && (
            <ImageVideoWrapper
              alignment={text_position}
              displayorder={media_position}
            >
              <MediaQuery query="(max-width: 700px)">
                <ImageVideo src={mobile_image_video_file_location} />
              </MediaQuery>

              <MediaQuery query="(min-width: 701px)">
                <ImageVideo src={image_video_file_location} />
              </MediaQuery>
            </ImageVideoWrapper>
          )
        )}
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
