import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, ErrorBlock } from '../../components/blockHelpers'
import { ButtonLink } from '../../components/buttons'
import { HedvigWordmark } from '../../components/icons/HedvigWordmark'
import { GlobalStory } from '../../storyblok/StoryContainer'
import { getStoryblokLinkUrl } from '../../utils/storyblok-link'
import { BaseBlockProps } from '../BaseBlockProps'
import { Burger, MobileVisibility, TABLET_BP_DOWN } from './mobile'

export const WRAPPER_HEIGHT = '5rem'
export const HEADER_VERTICAL_PADDING = '1.5rem'
export const TOGGLE_TRANSITION_TIME = 250

const Wrapper = styled('div')(
  ({ inverse, open }: { inverse: boolean; open: boolean }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    color: inverse ? colors.WHITE : undefined,

    [TABLET_BP_DOWN]: {
      bottom: open ? 0 : undefined,
    },
  }),
)
const Filler = styled('div')({
  height: WRAPPER_HEIGHT,
})
const HeaderBackgroundFiller = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: -1,
  height: WRAPPER_HEIGHT,
  backgroundColor: colors.WHITE,
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1)',
})

const InnerHeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: WRAPPER_HEIGHT,
  padding: HEADER_VERTICAL_PADDING + ' 0',
})
const Menu = styled('div')(({ open }: { open: boolean }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  [TABLET_BP_DOWN]: {
    position: 'absolute',
    display: 'block',
    zIndex: 101,
    width: '80%',
    top: 0,
    bottom: 0,
    left: open ? '20%' : '100%',
    paddingTop: `calc(${WRAPPER_HEIGHT} + ${HEADER_VERTICAL_PADDING})`,
    background: colors.WHITE,
    transition: `left ${TOGGLE_TRANSITION_TIME}ms`,
    color: colors.OFF_BLACK_DARK,
  },
}))

const MenuLink = styled('a')({
  color: 'inherit',
  textDecoration: 'none',
  padding: '0 1rem',

  '&:last-of-type': {
    paddingRight: 0,
  },

  [TABLET_BP_DOWN]: {
    display: 'block',
    width: '100%',
    padding: `1rem 2rem`,

    '&:first-of-type': {
      paddingTop: 0,
    },
  },
})

const LogoLink = styled('a')({
  display: 'inline-flex',
  paddingTop: 3, // fix to push down logo a little or it looks unbalanced
  color: 'inherit',
})

const ButtonWrapper = styled('div')({
  paddingLeft: '2rem',

  [TABLET_BP_DOWN]: {
    paddingTop: '1.5rem',
    paddingLeft: '1rem',
  },
})

interface HeaderBlockProps extends BaseBlockProps {
  is_transparent: boolean
  inverse_colors: boolean
}

interface MobileVisibilityEffects {
  toggleOpen: () => void
}

const Header: React.FunctionComponent<
  { story: GlobalStory } & HeaderBlockProps
> = ({ story, is_transparent, inverse_colors }) => (
  <>
    {!is_transparent && <Filler />}

    <Container<MobileVisibility, {}, {}, MobileVisibilityEffects>
      initialState={{ isOpen: false, isClosing: false }}
      effects={{
        toggleOpen: () => ({ setState, state }) => {
          if (state.isClosing) {
            return
          }

          if (state.isOpen) {
            setState({ isClosing: true, isOpen: false })
            setTimeout(
              () => setState({ isClosing: false }),
              TOGGLE_TRANSITION_TIME,
            )
            return
          }

          setState({ isOpen: true })
        },
      }}
    >
      {({ isOpen, isClosing, toggleOpen }) => (
        <Wrapper
          inverse={is_transparent && inverse_colors}
          open={isOpen || isClosing}
        >
          {!is_transparent && <HeaderBackgroundFiller />}
          <ContentWrapper>
            <InnerHeaderWrapper>
              <LogoLink href="/">
                <HedvigWordmark height={30} />
              </LogoLink>

              <Burger
                isOpen={isOpen}
                isClosing={isClosing}
                onClick={toggleOpen}
                preventInverse={inverse_colors && isOpen}
              />
              <Menu open={isOpen}>
                {(story.content.header_menu_items || []).map((menuItem) => (
                  <MenuLink
                    key={menuItem._uid}
                    href={getStoryblokLinkUrl(menuItem.link)}
                  >
                    {menuItem.label}
                  </MenuLink>
                ))}

                {story.content.show_cta && (
                  <ButtonWrapper>
                    <ButtonLink
                      size="sm"
                      bold
                      href={getStoryblokLinkUrl(story.content.cta_link)}
                    >
                      {story.content.cta_label}
                    </ButtonLink>
                  </ButtonWrapper>
                )}
              </Menu>
            </InnerHeaderWrapper>
          </ContentWrapper>
        </Wrapper>
      )}
    </Container>
  </>
)

export const HeaderBlock: React.FunctionComponent<HeaderBlockProps> = (
  headerBlockProps,
) => (
  <>
    <Container<{ story: GlobalStory | undefined }> context="globalStory">
      {({ story }) =>
        story ? (
          <Header story={story} {...headerBlockProps} />
        ) : (
          <ErrorBlock message="NO GLOBAL POST FOUND - remove header block or add a global post" />
        )
      }
    </Container>
  </>
)
