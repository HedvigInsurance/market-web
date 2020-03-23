import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import {
  CONTENT_GUTTER,
  CONTENT_GUTTER_MOBILE,
  ContentWrapper,
  MOBILE_BP_UP,
  SectionWrapper,
  SITE_MAX_WIDTH,
  TABLET_BP_DOWN,
  TABLET_BP_UP,
} from '../components/blockHelpers'
import { ContextContainer } from '../components/containers/ContextContainer'
import { HedvigH } from '../components/icons/HedvigH'
import { GlobalStoryContainer } from '../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../utils/storyblok'
import { BaseBlockProps } from './BaseBlockProps'

const BP_DOWN = '@media (max-width: 600px)'

const FooterWrapper = styled('div')({
  padding: `5rem 0`,

  [MOBILE_BP_UP]: {
    padding: `4.25rem 0 12rem`,
  },
})

const IconWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
  margin: '0 auto 3.125rem',
  paddingLeft: CONTENT_GUTTER_MOBILE,
  paddingRight: CONTENT_GUTTER_MOBILE,

  [MOBILE_BP_UP]: {
    paddingLeft: CONTENT_GUTTER,
    paddingRight: CONTENT_GUTTER,
  },

  ...SITE_MAX_WIDTH,
})

const FooterInnerWrapper = styled('footer')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  [TABLET_BP_DOWN]: {
    flexDirection: 'column',
  },
})

const LinkTextWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const LinksColumnsWrapper = styled('nav')({
  display: 'flex',
  flexDirection: 'row',
  marginTop: '2rem',
  [TABLET_BP_UP]: {
    marginTop: '0',
    marginBottom: '5rem',
    justifyContent: 'center',
  },
  [BP_DOWN]: {
    flexWrap: 'wrap',
  },
})

const ColumnHeader = styled('div')({
  paddingBottom: '1.5rem',
  fontSize: '1.125rem',
  color: colorsV3.gray500,
  [TABLET_BP_UP]: {
    paddingBottom: '2rem',
    fontSize: '1.5rem',
  },
})

const LinkColumn = styled('div')({
  '&:not(:last-of-type)': {
    paddingRight: '7rem',
    paddingBottom: '.5rem',
    '@media(max-width:1100px)': {
      paddingRight: '4rem',
    },
    [BP_DOWN]: {
      width: '50%',
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
  fontSize: '0.875rem',
  textDecoration: 'none',
  marginBottom: '14px',
})

const FooterFooter = styled('div')({
  opacity: 0.28,
  fontSize: '0.9rem',
  marginTop: '2rem',
})

type FooterBlockProps = BaseBlockProps

export const FooterBlockBrandPivot: React.FunctionComponent<FooterBlockProps> = ({
  color,
  extra_styling,
}) => (
  <GlobalStoryContainer>
    {({ globalStory }) => (
      <ContextContainer>
        {(context) => (
          <SectionWrapper
            brandPivot
            colorComponent={color}
            size="none"
            extraStyling={extra_styling}
          >
            <FooterWrapper>
              <IconWrapper>
                <HedvigH size={48} />
              </IconWrapper>
              <ContentWrapper brandPivot>
                <FooterInnerWrapper>
                  <LinkTextWrapper>
                    {globalStory.content.get_started?.length &&
                    globalStory.content.company?.length &&
                    globalStory.content.legal?.length &&
                    globalStory.content.social?.length ? (
                      <LinksColumnsWrapper>
                        <LinkColumn>
                          <ColumnHeader>
                            {context.lang === 'sv'
                              ? 'Hemförsäkring'
                              : 'Home insurance'}
                          </ColumnHeader>
                          {(globalStory.content.get_started ?? []).map(
                            (link) => (
                              <Link
                                key={link._uid}
                                href={getStoryblokLinkUrl(link.link)}
                              >
                                {link.label}
                              </Link>
                            ),
                          )}
                        </LinkColumn>
                        <LinkColumn>
                          <ColumnHeader>
                            {context.lang === 'sv' ? 'Hedvig' : 'Company'}
                          </ColumnHeader>
                          {(globalStory.content.company ?? []).map((link) => (
                            <Link
                              key={link._uid}
                              href={getStoryblokLinkUrl(link.link)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </LinkColumn>
                        <LinkColumn>
                          <ColumnHeader>{'Legal'}</ColumnHeader>
                          {(globalStory.content.legal ?? []).map((link) => (
                            <Link
                              key={link._uid}
                              href={getStoryblokLinkUrl(link.link)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </LinkColumn>
                        <LinkColumn>
                          <ColumnHeader>{'Social'}</ColumnHeader>
                          {(globalStory.content.social ?? []).map((link) => (
                            <Link
                              key={link._uid}
                              href={getStoryblokLinkUrl(link.link)}
                            >
                              {link.label}
                            </Link>
                          ))}
                        </LinkColumn>
                      </LinksColumnsWrapper>
                    ) : (
                      <LinksColumnsWrapper>
                        <LinkColumn>
                          {(globalStory.content.footer_menu_items_1 ?? []).map(
                            (link) => (
                              <Link
                                key={link._uid}
                                href={getStoryblokLinkUrl(link.link)}
                              >
                                {link.label}
                              </Link>
                            ),
                          )}
                        </LinkColumn>
                        <LinkColumn>
                          {(globalStory.content.footer_menu_items_2 ?? []).map(
                            (link) => (
                              <Link
                                key={link._uid}
                                href={getStoryblokLinkUrl(link.link)}
                              >
                                {link.label}
                              </Link>
                            ),
                          )}
                        </LinkColumn>
                      </LinksColumnsWrapper>
                    )}

                    <FooterFooter
                      dangerouslySetInnerHTML={{
                        __html: globalStory.content.footer_paragraph?.html,
                      }}
                    />
                  </LinkTextWrapper>
                </FooterInnerWrapper>
              </ContentWrapper>
            </FooterWrapper>
          </SectionWrapper>
        )}
      </ContextContainer>
    )}
  </GlobalStoryContainer>
)
