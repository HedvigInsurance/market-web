import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { Mount } from 'react-lifecycle-components'
import MediaQuery from 'react-responsive'
import { AppLink } from '../components/AppLink'
import { ContentWrapper, MOBILE_BP_DOWN } from '../components/blockHelpers'
import { ButtonLink } from '../components/buttons'
import { LinkComponent } from '../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 900px)'

const Wrapper = styled('section')({
  position: 'relative',
  overflow: 'hidden',

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
  backgroundColor: 'rgb(97, 8, 247)',
})
const Video = styled('video')({
  position: 'relative',
  width: '100%',
  zIndex: -1,
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
    fontsize: '3rem',
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

export class PapersPhoneVideoBlock extends React.Component<
  PapersPhoneVideoBlockProps
> {
  private timeout: number | null = null

  public render() {
    return (
      <Wrapper>
        <Background />
        <Video autoPlay loop>
          <>
            {/*<MediaQuery query="(max-width: 900px)">*/}
            {/*<source*/}
            {/*src="https://cdn.hedvig.com/www/papers-phone/md.webm"*/}
            {/*type="video/webm"*/}
            {/*/>*/}
            {/*<source*/}
            {/*src="https://cdn.hedvig.com/www/papers-phone/md.mp4"*/}
            {/*type="video/mp4"*/}
            {/*/>*/}
            {/*</MediaQuery>*/}
            {/*<MediaQuery query="(min-width: 901px)">*/}
            <source
              src="https://cdn.hedvig.com/www/papers-phone/xl.webm"
              type="video/webm"
            />
            <source
              src="https://cdn.hedvig.com/www/papers-phone/xl.mp4"
              type="video/mp4"
            />
            {/*</MediaQuery>*/}
          </>
        </Video>

        <Content>
          <Title>{this.props.title}</Title>
          <Paragraph
            dangerouslySetInnerHTML={{
              __html: this.props.paragraph && this.props.paragraph.html,
            }}
          />

          {this.props.cta_branch_link ? (
            <AppLink>
              {({ link, handleClick }) => (
                <Cta href={link} onClick={handleClick} size="sm" bold>
                  {this.props.cta_label}
                </Cta>
              )}
            </AppLink>
          ) : (
            <Cta
              href={getStoryblokLinkUrl(this.props.cta_target)}
              size="sm"
              bold
            >
              {this.props.cta_label}
            </Cta>
          )}
        </Content>
      </Wrapper>
    )
  }

  // public componentDidMount(): void {
  //   this.timeout = window.setInterval(() => {
  //     this.handleResize()
  //   }, 100)
  // }
  //
  // public componentWillUnmount(): void {
  //   window.clearTimeout(this.timeout!)
  //   this.timeout = null
  // }
  //
  // private handleResize = () => {
  //   this.forceUpdate()
  // }
}
