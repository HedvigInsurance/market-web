import * as Cookies from 'js-cookie'
import * as React from 'react'

import { Container } from 'constate'
import { Mount } from 'react-lifecycle-components'
import { RouteComponentProps, withRouter } from 'react-router'
import { StoryContainer } from '../storyblok/StoryContainer'
import { getPublicHost } from '../utils/storyblok'
import { trackEvent } from '../utils/tracking/trackEvent'

// Dynamically creating a link automatically copies over
// any utm tags sent from ad networks
interface AppLinkProps {
  children: (props: {
    handleClick: (e: React.MouseEvent<HTMLElement>) => void
    link: string
  }) => React.ReactNode
  channel?: string
  campaign?: string
  tags?: ReadonlyArray<string>
  keywords?: ReadonlyArray<string>
  feature?: string
  stage?: string
}
interface AppLinkState {
  link: string
}

const AppLinkComponent: React.FunctionComponent<
  AppLinkProps & RouteComponentProps
  > = (props) => (
    <Container<AppLinkState, { setLink: (link: string) => void }>
      initialState={{
        link: undefined,
      }}
      actions={{ setLink: (link) => () => ({ link }) }}
    >
      {({ link, setLink }) => (
        <>
          <StoryContainer>
            {({ story }) => (
              <>
                <Mount
                  on={() => {
                    const utmParams = Cookies.getJSON('utm-params') || {}
                    const source = utmParams.source || props.channel
                    const medium = utmParams.medium || props.feature
                    const name = utmParams.name || props.campaign
                    const content = utmParams.content || props.tags
                    const keywords = utmParams.keywords || props.tags

                    const lang = story ? story.lang : 'sv'
                    const host = getPublicHost() || 'https://www.hedvig.com'

                    const desktopLink = `${host}/${
                      lang === 'sv' ? '' : lang + '/'
                      }new-member`

                    setLink(
                      `https://hedvig.page.link/?link=${desktopLink}&utm_source=${source}&utm_medium=${medium}&utm_name=${name}&utm_content=${content}&utm_keywords=${keywords}`,
                    )
                  }}
                >
                  {null}
                </Mount>
                {props.children({
                  link,
                  handleClick: (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault()
                    trackEvent('Click app link', {
                      label: props.tags && props.tags.join(', '),
                    })
                    window.location.href = link
                  },
                })}
              </>
            )}
          </StoryContainer>
        </>
      )}
    </Container>
  )

AppLinkComponent.defaultProps = {
  channel: 'organic',
  campaign: 'direct',
}

export const AppLink = withRouter<AppLinkProps & RouteComponentProps>(
  AppLinkComponent,
)
