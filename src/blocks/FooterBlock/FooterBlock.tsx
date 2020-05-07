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

const FooterWrapper = styled.div`
  padding: 5rem 0 7.5rem;

  ${TABLET_BP_UP} {
    padding: 6.5rem 0 12rem;
  }

  ${MOBILE_MENU_HIDDEN} {
    padding-top: 4.25rem;
  }
`

const IconWrapper = styled.div`
  display: none;

  ${MOBILE_MENU_HIDDEN} {
    display: flex;
    justify-content: flex-end;
    margin: 0 auto 3.125rem;
    padding-left: ${CONTENT_GUTTER};
    padding-right: ${CONTENT_GUTTER};
  }
  ${SITE_MAX_WIDTH}
`

const LinksColumnsWrapper = styled.nav`
  display: flex;
  flex-direction: row;

  ${TABLET_BP_UP} {
    margin-top: 0;
    margin-bottom: 5rem;
    justify-content: center;
  }

  ${BP_DOWN} {
    flex-wrap: wrap;
  }
`

const ColumnHeader = styled.div`
  padding-bottom: 1.5rem;
  font-size: 1.125rem;
  color: ${colorsV3.gray500};

  ${TABLET_BP_UP} {
    padding-bottom: 2rem;
    font-size: 1.5rem;
  }
`

const LinkColumn = styled.div`
  &:not(:last-of-type) {
    padding-right: 7rem;
    padding-bottom: 0.5rem;

    @media (max-width: 1100px) {
      padding-right: 4rem;
    }

    ${BP_DOWN} {
      width: 50%;
      padding-right: 0;
      padding-bottom: 2rem;
    }
  }

  &:last-of-type {
    ${BP_DOWN} {
      padding-bottom: 2rem;
    }
  }
`
const Link = styled.a`
  display: block;
  color: ${colorsV3.gray100};
  font-size: 0.875rem;
  text-decoration: none;
  margin-bottom: 14px;
`

const FooterFooter = styled.div`
  margin-top: 2rem;
  font-size: 0.75rem;
  color: ${colorsV3.gray500};
`

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
