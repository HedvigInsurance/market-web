import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../../components/blockHelpers'
import { GlobalStoryContainer } from '../../storyblok/StoryContainer'
import { BaseBlockProps } from '../BaseBlockProps'
import {
  FacebookIcon,
  InstagramIcon,
  SweFlag,
  TwitterIcon,
  UkFlag,
} from './icons'

const BP_DOWN = '@media (max-width: 600px)'

const FooterInnerWrapper = styled('footer')({
  display: 'flex',
  flexDirection: 'column',
})

const LinksWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  [MOBILE_BP_DOWN]: {
    flexDirection: 'column',
  },
})
const LinksColumnsWrapper = styled('nav')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [BP_DOWN]: {
    flexDirection: 'column',
  },
})
const LinkColumn = styled('div')({
  '&:not(:last-of-type)': {
    paddingRight: '7rem',
    paddingBottom: '.5rem',
    [TABLET_BP_DOWN]: {
      paddingRight: '3rem',
    },
    [BP_DOWN]: {
      paddingRight: 0,
      paddingBottom: '2rem',
    },
  },
  '&:last-of-type': {
    [BP_DOWN]: {
      paddingBottom: '2rem',
    },
  },
})
const Link = styled('a')({
  display: 'block',
  color: 'inherit',
  textDecoration: 'none',
  marginBottom: '1.5rem',
})

const AppstoreBadgeWrapper = styled('div')({
  [MOBILE_BP_DOWN]: {
    paddingBottom: '2rem',
  },
})
const AppstoreLink = styled('a')({
  display: 'block',
  textAlign: 'right',
  '&:not(:last-of-type)': {
    paddingBottom: '1rem',
  },

  [MOBILE_BP_DOWN]: {
    textAlign: 'left',
  },
})
const ItunesImg = styled('img')({
  height: 54,
})
const PlayImg = styled('img')({
  height: 54,
})

const SocialMediaContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: '2rem',
})
const SocialMediaLink = styled('a')({
  color: 'inherit',
  display: 'block',
  marginRight: '1rem',
})
const FooterFooter = styled('div')({})

const LangSwitchersContainer = styled('div')({
  paddingBottom: '2rem',
})
const LangSwitcher = styled('a')({
  display: 'inline-flex',
  paddingRight: '1rem',
})

type FooterBlockProps = BaseBlockProps

export const FooterBlock: React.FunctionComponent<FooterBlockProps> = ({
  color,
}) => (
  <GlobalStoryContainer>
    {({ globalStory }) => (
      <SectionWrapper color={color && color.color}>
        <ContentWrapper>
          <FooterInnerWrapper>
            <LinksWrapper>
              <LinksColumnsWrapper>
                <LinkColumn>
                  {(globalStory.content.footer_menu_items_1 || []).map(
                    (link) => (
                      <Link key={link._uid} href={link.link.cached_url}>
                        {link.label}
                      </Link>
                    ),
                  )}
                </LinkColumn>
                <LinkColumn>
                  {(globalStory.content.footer_menu_items_2 || []).map(
                    (link) => (
                      <Link key={link._uid} href={link.link.cached_url}>
                        {link.label}
                      </Link>
                    ),
                  )}
                </LinkColumn>
              </LinksColumnsWrapper>
              <AppstoreBadgeWrapper>
                <AppstoreLink href="https://itunes.apple.com/se/app/hedvig/id1303668531?mt=8">
                  <ItunesImg src="https://cdn.hedvig.com/www/appstores/app-store-badge.svg" />
                </AppstoreLink>
                <AppstoreLink href="https://play.google.com/store/apps/details?id=com.hedvig.app">
                  <PlayImg src="https://cdn.hedvig.com/www/appstores/google-play-badge.svg" />
                </AppstoreLink>
              </AppstoreBadgeWrapper>
            </LinksWrapper>

            <SocialMediaContainer>
              <SocialMediaLink href="https://www.fb.me/hedvigapp">
                <FacebookIcon />
              </SocialMediaLink>
              <SocialMediaLink href="https://www.instagram.com/hedvig.app/">
                <InstagramIcon />
              </SocialMediaLink>
              <SocialMediaLink href="https://twitter.com/hedvigapp">
                <TwitterIcon />
              </SocialMediaLink>
            </SocialMediaContainer>

            <LangSwitchersContainer>
              <LangSwitcher href="/">
                <SweFlag />
              </LangSwitcher>
              <LangSwitcher href="/en">
                <UkFlag />
              </LangSwitcher>
            </LangSwitchersContainer>

            <FooterFooter
              dangerouslySetInnerHTML={{
                __html:
                  globalStory.content.footer_paragraph &&
                  globalStory.content.footer_paragraph.html,
              }}
            />
          </FooterInnerWrapper>
        </ContentWrapper>
      </SectionWrapper>
    )}
  </GlobalStoryContainer>
)
