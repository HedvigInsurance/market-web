import * as Cookies from 'js-cookie'
import * as React from 'react'

import { Container } from 'constate'
import { Mount } from 'react-lifecycle-components'
import { RouteComponentProps, withRouter } from 'react-router'
import { StoryContainer } from '../storyblok/StoryContainer'
import { getPublicHost } from '../utils/storyblok'
import { trackEvent } from '../utils/tracking/trackEvent'
import { utmParamsToBranchLinkOptions } from '../utils/tracking/utmToBranch'

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
      // Fallback if link creation fails (static channel and source)
      // Branch is blocked by adblockers (e.g. uBlock)
      // https://dashboard.branch.io/quick-links/qlc/config/514349583263033320
      link: 'https://hedvig.app.link/cD3ZL59gjN',
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
                  const hasBranch =
                    window &&
                    (window as any).branch &&
                    typeof (window as any).branch.link === 'function'
                  if (!hasBranch) {
                    return
                  }

                  const utmParams = Cookies.getJSON('utm-params') || {}
                  const linkOptions = utmParamsToBranchLinkOptions(utmParams, {
                    channel: props.channel,
                    campaign: props.campaign,
                    feature: props.feature,
                    tags: props.tags,
                    keywords: props.keywords,
                    stage: props.stage,
                  })
                  const lang = story ? story.lang : 'sv'

                  const path = props.location.pathname
                  const host = getPublicHost() || 'https://www.hedvig.com'
                  ;(window as any).branch.link(
                    {
                      ...linkOptions,
                      data: {
                        $desktop_url: `${host}/${
                          lang === 'sv' ? '' : lang + '/'
                        }new-member`,
                        path,
                      },
                    },
                    // tslint:disable-next-line variable-name
                    (_err: Error | undefined, realLink: string | undefined) => {
                      if (realLink) {
                        setLink(realLink)
                      }
                    },
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
