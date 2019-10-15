import * as Cookies from 'js-cookie'
import * as React from 'react'

import { RouteComponentProps, withRouter } from 'react-router'
import { Story, StoryContainer } from '../storyblok/StoryContainer'
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

const generateLink = (
  props: AppLinkProps & RouteComponentProps,
  story: Story | undefined,
) => {
  const utmParams = Cookies.getJSON('utm-params') || {}
  const source = utmParams.source || props.channel
  const medium = utmParams.medium || props.feature
  const name = utmParams.name || props.campaign
  const content = utmParams.content || props.tags
  const keywords = utmParams.keywords || props.tags

  const lang = story ? story.lang : 'sv'
  const host = getPublicHost() || 'https://www.hedvig.com'

  const desktopLink = `${host}/${lang === 'sv' ? '' : lang + '/'}new-member`

  const utmSourcePath = source ? `utm_source=${source}&` : ''
  const utmMediumPath = medium ? `utm_medium=${medium}&` : ''
  const utmNamePath = name ? `utm_name=${name}&` : ''
  const utmContentPath = content ? `utm_content=${content}&` : ''
  const utmKeywordsPath = content ? `utm_keywords=${keywords}` : ''

  const link = `https://hedvig.page.link/?link=${desktopLink}&${utmSourcePath}${utmMediumPath}${utmNamePath}${utmContentPath}${utmKeywordsPath}`
  return link.replace(/&\s*$/, '')
}

const AppLinkComponent: React.FunctionComponent<
  AppLinkProps & RouteComponentProps
> = (props) => (
  <StoryContainer>
    {({ story }) =>
      props.children({
        link: generateLink(props, story),
        handleClick: (e: React.MouseEvent<HTMLElement>) => {
          e.preventDefault()
          trackEvent('Click app link', {
            label: props.tags && props.tags.join(', '),
          })
          window.location.href = generateLink(props, story)
        },
      })
    }
  </StoryContainer>
)

AppLinkComponent.defaultProps = {
  channel: 'organic',
  campaign: 'direct',
}

export const AppLink = withRouter<AppLinkProps & RouteComponentProps>(
  AppLinkComponent,
)
