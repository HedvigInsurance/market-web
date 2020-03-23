import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import React from 'react'
import { Mount } from 'react-lifecycle-components'
import MediaQuery from 'react-responsive'
import { AppLink } from '../components/AppLink'
import {
  CONTENT_GUTTER_MOBILE,
  ContentWrapper,
  MOBILE_BP_DOWN,
} from '../components/blockHelpers'
import {
  ButtonLink,
  ButtonStyleType,
  ButtonWeight,
} from '../components/buttons'
import { LinkComponent } from '../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import {
  BaseBlockProps,
  ColorComponent,
  MarkdownHtmlComponent,
} from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 800px)'

const Wrapper = styled('section')({
  position: 'relative',
  overflow: 'hidden',
  minHeight: '50vh',
  transition: 'height 1500ms',

  [TABLET_BP_DOWN]: {
    textAlign: 'center',
  },
})

const Background = styled('div')<{ backgroundColor: string }>(
  ({ backgroundColor }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor,
  }),
)
const BackgroundEvener = styled('div')<{
  backgroundGradientStart: string
  background: string
}>(({ backgroundGradientStart, background }) => ({
  height: 60,
  position: 'relative',
  marginTop: -60,
  zIndex: 2,
  background: `linear-gradient(to bottom, ${backgroundGradientStart}, ${background})`,
}))
const Video = styled('video')({
  position: 'relative',
  width: '100%',
  zIndex: -1,
  transition: 'height 1500ms',
})

const Content = styled(ContentWrapper)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateY(-50%) translateX(-50%)',
  zIndex: 1,
  color: colors.WHITE,

  [TABLET_BP_DOWN]: {
    position: 'static',
    transform: 'none',
    padding: `1.5rem ${CONTENT_GUTTER_MOBILE} 3.5rem ${CONTENT_GUTTER_MOBILE}`,
  },
})

const Title = styled('h1')<{ useDropShadow: boolean }>(({ useDropShadow }) => ({
  maxWidth: '66%',
  fontSize: '4.5rem',
  textShadow: useDropShadow ? '1px 1px 5px rgba(0, 0, 0, .3)' : undefined,

  [TABLET_BP_DOWN]: {
    fontSize: '3.75rem',
    maxWidth: 'none',
  },
  [MOBILE_BP_DOWN]: {
    fontSize: '3rem',
  },
}))
const Paragraph = styled('div')<{ useDropShadow: boolean }>(
  ({ useDropShadow }) => ({
    fontSize: '1.125rem',
    marginTop: '1.5rem',
    maxWidth: '50%',

    [TABLET_BP_DOWN]: {
      maxWidth: 'none',
    },
    textShadow: useDropShadow ? '3px 3px 5px rgba(0, 0, 0, .3)' : undefined,
  }),
)
const Cta = styled(ButtonLink)({
  marginTop: '1.7rem',
  fontsize: '1.25rem',
  padding: '1rem 2rem',

  [TABLET_BP_DOWN]: {
    marginBottom: '1.7rem',
  },
})
const GhostCta = styled(Cta)({
  color: colors.WHITE,
  borderColor: colors.WHITE,
  marginLeft: '1rem',
  transition: 'color 300ms, background 300ms',

  '&:hover, &:focus': {
    color: colors.PURPLE,
    background: colors.WHITE,
  },
})

interface BackgroundVideoBlockProps extends BaseBlockProps {
  video_file_location: string
  use_text_drop_shadow: boolean
  background_gradient_start: string
  background_color: string
  title: string
  paragraph: MarkdownHtmlComponent
  cta_label: string
  cta_branch_link: boolean
  cta_target: LinkComponent
  ghost_cta: boolean
  ghost_cta_target: LinkComponent
  ghost_cta_label: string
  cta_color?: ColorComponent
  cta_weight?: ButtonWeight
  cta_style?: ButtonStyleType
}

export const BackgroundVideoBlock: React.FunctionComponent<BackgroundVideoBlockProps> = (
  props,
) => (
  <Container<{ isMounted: boolean }, { mount: () => void }>
    initialState={{ isMounted: false }}
    actions={{ mount: () => () => ({ isMounted: true }) }}
  >
    {({ mount, isMounted }) => (
      <Mount on={mount}>
        <Wrapper>
          <Background backgroundColor={props.background_color} />
          {isMounted && (
            <>
              <MediaQuery query="(max-width: 800px)">
                <Video
                  playsInline
                  muted
                  autoPlay
                  loop
                  poster={`${props.video_file_location}/md.png`}
                >
                  <source
                    src={`${props.video_file_location}/md.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`${props.video_file_location}/md.mp4`}
                    type="video/mp4"
                  />
                </Video>
              </MediaQuery>
              <MediaQuery query="(min-width: 801px) and (max-width: 1200px)">
                <Video
                  playsInline
                  muted
                  autoPlay
                  loop
                  poster={`${props.video_file_location}/lg.png`}
                >
                  <source
                    src={`${props.video_file_location}/lg.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`${props.video_file_location}/lg.mp4`}
                    type="video/mp4"
                  />
                </Video>
              </MediaQuery>
              <MediaQuery query="(min-width: 1201px) and (max-width: 1500px)">
                <Video
                  playsInline
                  muted
                  autoPlay
                  loop
                  poster={`${props.video_file_location}/xl.png`}
                >
                  <source
                    src={`${props.video_file_location}/xl.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`${props.video_file_location}/xl.mp4`}
                    type="video/mp4"
                  />
                </Video>
              </MediaQuery>
              <MediaQuery query="(min-width: 1501px)">
                <Video
                  playsInline
                  muted
                  autoPlay
                  loop
                  poster={`${props.video_file_location}/xxl.png`}
                >
                  <source
                    src={`${props.video_file_location}/xxl.webm`}
                    type="video/webm"
                  />
                  <source
                    src={`${props.video_file_location}/xxl.mp4`}
                    type="video/mp4"
                  />
                </Video>
              </MediaQuery>
            </>
          )}
          <BackgroundEvener
            backgroundGradientStart={props.background_gradient_start}
            background={props.background_color}
          />

          <Content>
            <Title useDropShadow={props.use_text_drop_shadow}>
              {props.title}
            </Title>
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: props.paragraph && props.paragraph.html,
              }}
              useDropShadow={props.use_text_drop_shadow}
            />

            {props.cta_branch_link ? (
              <AppLink>
                {({ link, handleClick }) => (
                  <Cta
                    href={link}
                    onClick={handleClick}
                    size="sm"
                    weight={props.cta_weight}
                    color={props.cta_color && props.cta_color.color}
                    styleType={props.cta_style}
                  >
                    {props.cta_label}
                  </Cta>
                )}
              </AppLink>
            ) : (
              <Cta
                href={getStoryblokLinkUrl(props.cta_target)}
                size="sm"
                weight={props.cta_weight}
                color={props.cta_color && props.cta_color.color}
                styleType={props.cta_style}
              >
                {props.cta_label}
              </Cta>
            )}
            {props.ghost_cta && (
              <GhostCta
                href={getStoryblokLinkUrl(props.ghost_cta_target)}
                size="sm"
                styleType="outlined"
                color={props.cta_color && props.cta_color.color}
                weight={props.cta_weight}
              >
                {props.ghost_cta_label}
              </GhostCta>
            )}
          </Content>
        </Wrapper>
      </Mount>
    )}
  </Container>
)
