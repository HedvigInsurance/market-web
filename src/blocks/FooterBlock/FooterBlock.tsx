import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  CONTENT_GUTTER,
  ContentWrapper,
  SectionWrapper,
  SITE_MAX_WIDTH,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { HedvigH } from 'components/icons/HedvigH'
import React from 'react'
import { GlobalStory, GlobalStoryContainer } from 'storyblok/StoryContainer'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import { BrandPivotBaseBlockProps } from '../BaseBlockProps'

const BP_DOWN = '@media (max-width: 600px)'
const MOBILE_MENU_HIDDEN = '@media (min-width: 1001px)'

const FooterWrapper = styled('div')({
  padding: `5rem 0 7.5rem`,

  [TABLET_BP_UP]: {
    padding: `6.5rem 0 12rem`,
  },

  [MOBILE_MENU_HIDDEN]: {
    paddingTop: `4.25rem`,
  },
})

const IconWrapper = styled('div')({
  display: 'none',

  [MOBILE_MENU_HIDDEN]: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '0 auto 3.125rem',
    paddingLeft: CONTENT_GUTTER,
    paddingRight: CONTENT_GUTTER,
  },
  ...SITE_MAX_WIDTH,
})

const LinksColumnsWrapper = styled('nav')({
  display: 'flex',
  flexDirection: 'row',
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
  color: colorsV3.gray100,
  fontSize: '0.875rem',
  textDecoration: 'none',
  marginBottom: '14px',
})

const FooterFooter = styled('div')({
  opacity: 0.28,
  fontSize: '0.9rem',
  marginTop: '2rem',
})

type FooterBlockProps = BrandPivotBaseBlockProps

export const Footer: React.FC<{ story: GlobalStory } & FooterBlockProps> = ({
  color,
  extra_styling,
  story,
}) => (
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
        <LinksColumnsWrapper>
          {(story.content.footer_menu_items ?? []).map((menuItem) => (
            <LinkColumn>
              <ColumnHeader key={menuItem._uid}>{menuItem.label}</ColumnHeader>
              {(menuItem.menu_items ?? []).map((link) => (
                <Link key={link._uid} href={getStoryblokLinkUrl(link.link)}>
                  {link.label}
                </Link>
              ))}
            </LinkColumn>
          ))}
        </LinksColumnsWrapper>

        <FooterFooter
          dangerouslySetInnerHTML={{
            __html: story.content.footer_paragraph?.html,
          }}
        />
      </ContentWrapper>
    </FooterWrapper>
  </SectionWrapper>
)

export const FooterBlock: React.FunctionComponent<FooterBlockProps> = (
  footerBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Footer story={globalStory} {...footerBlockProps} />}
  </GlobalStoryContainer>
)
