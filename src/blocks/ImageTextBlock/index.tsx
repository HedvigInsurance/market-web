import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import * as React from 'react'
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
  getColorStyles,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../../components/blockHelpers'
import { buttonSizes, ButtonWeight } from '../../components/buttons'
import { DeferredImage } from '../../components/DeferredImage'
import { DeferredVideo } from '../../components/DeferredVideo'
import {
  getStoryblokImage,
  getStoryblokLinkUrl,
  Image as StoryblokImage,
} from '../../utils/storyblok'
import {
  BaseBlockProps,
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
  Animateable & AlignedButtonProps
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
  hasLink?: boolean
}>(({ alignment, displayorder, hasLink }) => ({
  width: hasLink ? '100%' : '40%',
  display: 'block',
  order: alignment === 'center' && displayorder === 'top' ? -1 : 'initial',
  [MOBILE_BP_DOWN]: {
    maxWidth: '100%',
    width: 'auto',
    marginTop: displayorder === 'top' ? '0' : '3rem',
    display: 'block',
    order: displayorder === 'top' ? -1 : 'initial',
  },
}))

const ImageLink = styled('a')<{ displayorder: DisplayOrder }>(
  ({ displayorder }) => ({
    display: 'inline-block',
    width: '40%',
    flexShrink: 0,

    [MOBILE_BP_DOWN]: {
      maxWidth: '100%',
      width: 'auto',
      marginTop: displayorder === 'top' ? '0' : '3rem',
      display: 'block',
      order: displayorder === 'top' ? -1 : 'initial',
    },
  }),
)

const ImageVideoWrapper = styled('div')<{
  alignment: string
  displayorder: DisplayOrder
  hasLink?: boolean
}>(({ alignment, displayorder, hasLink }) => ({
  width: hasLink ? '100%' : '40%',
  flexShrink: hasLink ? 1 : 0,
  display: 'block',
  order: alignment === 'center' && displayorder === 'top' ? -1 : 'initial',
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

interface ImageTextBlockProps extends BaseBlockProps {
  animate?: boolean
  title_size?: TitleSize
  title: string
  title_color?: MinimalColorComponent
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
  button_size?: keyof typeof buttonSizes
  button_weight?: ButtonWeight
  button_position_mobile?: 'above' | 'below'
}

export const ImageTextBlock: React.FunctionComponent<ImageTextBlockProps> = ({
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
  use_image_link,
  image_link,
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
  button_size,
  button_weight,
  button_position_mobile,
}) => {
  return (
    <SectionWrapper
      color={color?.color}
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

      <AlignableContentWrapper textPosition={text_position}>
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
                ? getColorStyles(title_color.color).background
                : color
                ? getColorStyles(color.color).color
                : 'standard'
            }
            textPosition={text_position}
            animate={animate}
          >
            {title}
          </Title>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: paragraph.html,
            }}
            textPosition={text_position}
            animate={animate}
          />
          <MediaQuery query="(min-width: 801px)">
            <AnimatedAlignedButton
              title={button_title}
              type={button_type}
              branchLink={button_branch_link}
              buttonLink={button_link}
              show={show_button}
              color={button_color}
              size={button_size ? button_size : 'sm'}
              weight={button_weight}
              positionMobile={button_position_mobile}
              animate={animate}
            />
          </MediaQuery>
        </TextWrapper>
        <MediaQuery query="(max-width: 800px)">
          <AnimatedAlignedButton
            title={button_title}
            type={button_type}
            branchLink={button_branch_link}
            buttonLink={button_link}
            show={show_button}
            color={button_color}
            size={button_size ? button_size : 'sm'}
            weight={button_weight}
            positionMobile={button_position_mobile}
            animate={animate}
          />
        </MediaQuery>
        {image && image_type !== 'video' ? (
          use_image_link ? (
            <ImageLink
              href={getStoryblokLinkUrl(image_link)}
              displayorder={media_position}
            >
              <Image
                alignment={text_position}
                displayorder={media_position}
                src={getStoryblokImage(image)}
                hasLink={use_image_link}
              />
            </ImageLink>
          ) : (
            <Image
              alignment={text_position}
              displayorder={media_position}
              src={getStoryblokImage(image)}
            />
          )
        ) : (
          image_type === 'video' &&
          image_video_file_location &&
          mobile_image_video_file_location &&
          (use_image_link ? (
            <ImageLink
              href={getStoryblokLinkUrl(image_link)}
              displayorder={media_position}
            >
              <ImageVideoWrapper
                alignment={text_position}
                displayorder={media_position}
                hasLink={use_image_link}
              >
                <MediaQuery query="(max-width: 700px)">
                  <ImageVideo src={mobile_image_video_file_location} />
                </MediaQuery>

                <MediaQuery query="(min-width: 701px)">
                  <ImageVideo src={image_video_file_location} />
                </MediaQuery>
              </ImageVideoWrapper>
            </ImageLink>
          ) : (
            <ImageVideoWrapper
              alignment={text_position}
              displayorder={media_position}
              hasLink={use_image_link}
            >
              <MediaQuery query="(max-width: 700px)">
                <ImageVideo src={mobile_image_video_file_location} />
              </MediaQuery>

              <MediaQuery query="(min-width: 701px)">
                <ImageVideo src={image_video_file_location} />
              </MediaQuery>
            </ImageVideoWrapper>
          ))
        )}
      </AlignableContentWrapper>
    </SectionWrapper>
  )
}
