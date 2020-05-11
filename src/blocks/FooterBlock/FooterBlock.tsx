import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { AppButtons } from 'components/AppButtons/AppButtons'
import {
  CONTENT_GUTTER,
  ContentWrapper,
  LAPTOP_BP_UP,
  SectionWrapper,
  SITE_MAX_WIDTH,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { HedvigH } from 'components/icons/HedvigH'
import React from 'react'
import { GlobalStory, GlobalStoryContainer } from 'storyblok/StoryContainer'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import { BrandPivotBaseBlockProps } from '../BaseBlockProps'

const BP_UP = '@media (min-width: 601px)'
const MOBILE_MENU_HIDDEN = '@media (min-width: 1001px)'

const FooterWrapper = styled(SectionWrapper)`
  padding: 4rem 0 5.5rem;
  box-shadow: 0px -1px 0px rgba(250, 250, 250, 0.15);

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
  ${BP_UP} {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  ${TABLET_BP_UP} {
    margin-top: 0;
    margin-bottom: 5rem;
    justify-content: space-between;
  }
`

const ColumnHeader = styled.h5`
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: ${colorsV3.gray500};
`

const LinkColumn = styled.div`
  padding-bottom: 3.5rem;

  ${BP_UP} {
    width: 50%;
    padding-right: 4rem;
  }

  ${LAPTOP_BP_UP} {
    width: auto;
    padding-right: 7rem;
  }
`

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const Link = styled.a`
  display: block;
  color: ${colorsV3.gray100};
  font-size: 1rem;
  line-height: 2;
  text-decoration: none;
`

const FooterFooter = styled.div`
  margin-top: 2rem;
  font-size: 0.75rem;
  line-height: 1.6;
  color: ${colorsV3.gray500};

  & > div {
    margin-bottom: 1rem;
    text-align: center;
  }

  ${TABLET_BP_UP} {
    display: flex;
    justify-content: space-between;
    & > div {
      width: calc(50% - 2.375rem);
      text-align: left;
    }
  }
`

type FooterBlockProps = BrandPivotBaseBlockProps

export const Footer: React.FC<{ story: GlobalStory } & FooterBlockProps> = ({
  color,
  extra_styling,
  story,
}) => (
  <FooterWrapper
    as="footer"
    brandPivot
    colorComponent={color}
    size="none"
    extraStyling={extra_styling}
  >
    <IconWrapper>
      <HedvigH size={48} />
    </IconWrapper>
    <ContentWrapper brandPivot>
      <LinksColumnsWrapper>
        {(story.content.footer_menu_items ?? []).map((menuItem) => (
          <LinkColumn>
            <ColumnHeader key={menuItem._uid}>{menuItem.label}</ColumnHeader>
            <MenuList>
              {(menuItem.menu_items ?? []).map((link) => (
                <li key={link._uid}>
                  <Link href={getStoryblokLinkUrl(link.link)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </MenuList>
          </LinkColumn>
        ))}
      </LinksColumnsWrapper>
      {story.content.footer_download_title && (
        <>
          <ColumnHeader>{story.content.footer_download_title}</ColumnHeader>
          <AppButtons />
        </>
      )}

      <FooterFooter
        dangerouslySetInnerHTML={{
          __html: story.content.footer_paragraph?.html,
        }}
      />
    </ContentWrapper>
  </FooterWrapper>
)

export const FooterBlock: React.FunctionComponent<FooterBlockProps> = (
  footerBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Footer story={globalStory} {...footerBlockProps} />}
  </GlobalStoryContainer>
)
