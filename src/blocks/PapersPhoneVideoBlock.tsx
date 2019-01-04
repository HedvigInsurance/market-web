import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { Mount } from 'react-lifecycle-components'
import MediaQuery from 'react-responsive'
import { AppLink } from '../components/AppLink'
import {
  CONTENT_GUTTER_MOBILE,
  ContentWrapper,
  MOBILE_BP_DOWN,
} from '../components/blockHelpers'
import { ButtonLink } from '../components/buttons'
import { LinkComponent } from '../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

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

const Background = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  backgroundColor: 'rgb(97, 55, 243)',
})
const BackgroundEvener = styled('div')({
  height: 60,
  position: 'relative',
  marginTop: -60,
  zIndex: 2,
  background:
    'linear-gradient(to bottom, rgba(97, 55, 243,0), rgba(97, 55, 243, 1))',
})
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

const Title = styled('h1')({
  maxWidth: '66%',
  fontSize: '4.5rem',

  [TABLET_BP_DOWN]: {
    fontSize: '3.75rem',
    maxWidth: 'none',
  },
  [MOBILE_BP_DOWN]: {
    fontSize: '3rem',
  },
})
const Paragraph = styled('div')({
  fontSize: '1.125rem',
  marginTop: '1.5rem',
  maxWidth: '50%',

  [TABLET_BP_DOWN]: {
    maxWidth: 'none',
  },
})

const Cta = styled(ButtonLink)({
  marginTop: '1.7rem',
  fontsize: '1.25rem',
  padding: '1rem 2rem',

  [TABLET_BP_DOWN]: {
    marginBottom: '1.7rem',
  },
})

interface PapersPhoneVideoBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
  cta_label: string
  cta_branch_link: boolean
  cta_target: LinkComponent
}

export const PapersPhoneVideoBlock: React.FunctionComponent<
  PapersPhoneVideoBlockProps
> = (props) => (
  <Container<{ isMounted: boolean }, { mount: () => void }>
    initialState={{ isMounted: false }}
    actions={{ mount: () => () => ({ isMounted: true }) }}
  >
    {({ mount, isMounted }) => (
      <Mount on={mount}>
        <Wrapper>
          <Background />
          {isMounted && (
            <>
              <MediaQuery query="(max-width: 800px)">
                <Video
                  playsInline
                  muted
                  autoPlay
                  loop
                  poster="https://cdn.hedvig.com/www/papers-phone/md.png"
                >
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/md.webm"
                    type="video/webm"
                  />
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/md.mp4"
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
                  poster="https://cdn.hedvig.com/www/papers-phone/lg.png"
                >
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/lg.webm"
                    type="video/webm"
                  />
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/lg.mp4"
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
                  poster="https://cdn.hedvig.com/www/papers-phone/xl.png"
                >
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/xl.webm"
                    type="video/webm"
                  />
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/xl.mp4"
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
                  poster="https://cdn.hedvig.com/www/papers-phone/xxl.png"
                >
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/xxl.webm"
                    type="video/webm"
                  />
                  <source
                    src="https://cdn.hedvig.com/www/papers-phone/xxl.mp4"
                    type="video/mp4"
                  />
                </Video>
              </MediaQuery>
              <BackgroundEvener />
            </>
          )}

          <Content>
            <Title>{props.title}</Title>
            <Paragraph
              dangerouslySetInnerHTML={{
                __html: props.paragraph && props.paragraph.html,
              }}
            />

            {props.cta_branch_link ? (
              <AppLink>
                {({ link, handleClick }) => (
                  <Cta href={link} onClick={handleClick} size="sm" bold>
                    {props.cta_label}
                  </Cta>
                )}
              </AppLink>
            ) : (
              <Cta href={getStoryblokLinkUrl(props.cta_target)} size="sm" bold>
                {props.cta_label}
              </Cta>
            )}
          </Content>
        </Wrapper>
      </Mount>
    )}
  </Container>
)
