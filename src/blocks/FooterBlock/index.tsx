import styled from '@emotion/styled'
import * as React from 'react'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../../components/blockHelpers'
import { ContextContainer } from '../../components/containers/ContextContainer'
import { HedvigWordmark } from '../../components/icons/HedvigWordmark'
import { GlobalStoryContainer } from '../../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../../utils/storyblok'
import { BaseBlockProps } from '../BaseBlockProps'
import { SweFlag, UkFlag } from './icons'

const BP_DOWN = '@media (max-width: 600px)'

const FooterInnerWrapper = styled('footer')({
  display: 'flex',
  flexDirection: 'row',
  [TABLET_BP_DOWN]: {
    flexDirection: 'column',
  },
})

const LinkTextWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
})

const WordmarkFlagWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '15vw',
})

const LinksColumnsWrapper = styled('nav')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  [TABLET_BP_DOWN]: {
    marginTop: '2rem',
  },
  [BP_DOWN]: {
    flexWrap: 'wrap',
  },
})

const ColumnHeader = styled('div')({
  paddingBottom: '1.5rem',
  fontWeight: 'bold',
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
  textDecoration: 'none',
  marginBottom: '1rem',
})

const FooterFooter = styled('div')({
  opacity: 0.28,
  fontSize: '0.9rem',
  marginTop: '2rem',
})

const LangSwitchersContainer = styled('div')({
  paddingBottom: '2rem',
  paddingTop: '1.5rem',
})
const LangSwitcher = styled('a')({
  display: 'inline-flex',
  paddingRight: '1rem',
})

type FooterBlockProps = BaseBlockProps

export const FooterBlock: React.FunctionComponent<FooterBlockProps> = ({
  color,
  extra_styling,
}) => (
  <GlobalStoryContainer>
    {({ globalStory }) => (
      <ContextContainer>
        {(context) => (
          <SectionWrapper
            color={color && color.color}
            extraStyling={extra_styling}
          >
            <ContentWrapper>
              <FooterInnerWrapper>
                <WordmarkFlagWrapper>
                  <HedvigWordmark height={30} />

                  <LangSwitchersContainer>
                    <LangSwitcher href="/">
                      <SweFlag />
                    </LangSwitcher>
                    <LangSwitcher href="/en">
                      <UkFlag />
                    </LangSwitcher>
                  </LangSwitchersContainer>
                </WordmarkFlagWrapper>

                <LinkTextWrapper>
                  {globalStory.content.get_started &&
                  globalStory.content.get_started.length &&
                  globalStory.content.company &&
                  globalStory.content.company.length &&
                  globalStory.content.legal &&
                  globalStory.content.legal.length &&
                  globalStory.content.social &&
                  globalStory.content.social.length ? (
                    <LinksColumnsWrapper>
                      <LinkColumn>
                        <ColumnHeader>
                          {context.lang === 'sv'
                            ? 'Hemförsäkring'
                            : 'Home insurance'}
                        </ColumnHeader>
                        {(globalStory.content.get_started ?? []).map((link) => (
                          <Link
                            key={link._uid}
                            href={getStoryblokLinkUrl(link.link)}
                          >
                            {link.label}
                          </Link>
                        ))}
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
                      __html:
                        globalStory.content.footer_paragraph &&
                        globalStory.content.footer_paragraph.html,
                    }}
                  />
                </LinkTextWrapper>
              </FooterInnerWrapper>
            </ContentWrapper>
          </SectionWrapper>
        )}
      </ContextContainer>
    )}
  </GlobalStoryContainer>
)
