import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { Container } from 'constate'
import React from 'react'
import AnimateHeight from 'react-animate-height'
import { Chevron } from 'components/icons/Chevron'
import { MOBILE_BP_DOWN } from 'components/blockHelpers'
import { MenuItem as MenuItemType } from 'storyblok/StoryContainer'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import { TABLET_BP_DOWN, TABLET_BP_UP, DESKTOP_BP_UP } from './mobile'

const MenuListItem = styled('li')({
  position: 'relative',
  margin: 0,
  padding: 0,

  [TABLET_BP_UP]: {
    display: 'flex',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },

  [DESKTOP_BP_UP]: {
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem',
  },
})

const DropdownMenuContainer = styled('div')<{
  isClosing: boolean
  isOpen: boolean
  hasMenuGroups?: boolean
}>(({ isClosing, isOpen, hasMenuGroups = false }) => ({
  display: isOpen ? 'flex' : 'none',
  flexDirection: hasMenuGroups ? 'row' : 'column',
  position: 'absolute',
  left: '50%',
  top: 'calc(100% + .75rem)',
  background: colorsV3.gray100,
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1);',
  borderRadius: '0.5rem',
  opacity: isOpen && !isClosing ? 1 : 0,
  transition: 'opacity 150ms',
  transform: 'translateX(-50%)',
  overflowY: 'hidden',
  color: colorsV3.gray900,

  [TABLET_BP_DOWN]: {
    position: 'static',
    flexDirection: 'column',
    boxShadow: 'none',
    left: 0,
    background: 'inherit',
    color: 'inherit',
    fontSize: '1.5rem',
    transform: 'translateX(0)',
  },
}))

const DropdownMenuItemList = styled('ul')({
  margin: 0,
  padding: '1.5rem 0 .5rem',
  listStyle: 'none',

  [TABLET_BP_DOWN]: {
    padding: '0 1rem',
  },
})

const MenuLink = styled('a')<{ inverseColor?: boolean }>(
  ({ inverseColor }) => ({
    color: inverseColor ? colorsV3.gray100 : colorsV3.gray900,
    textDecoration: 'none',
    transition: 'color 300ms',

    [TABLET_BP_DOWN]: {
      display: 'inline-block',
      padding: `1rem 0.5rem 1rem 2rem`,
      fontFamily: fonts.FAVORIT,
      fontSize: '1.5rem',
    },

    [MOBILE_BP_DOWN]: {
      paddingLeft: '1.5rem',
    },
  }),
)

const GroupLabelListItem = styled(MenuListItem)({
  fontSize: '0.75rem',
})

const MenuGroupLabel = styled('a')<{ as?: 'span' }>({
  display: 'block',
  color: colorsV3.gray700,
  textTransform: 'uppercase',
  lineHeight: '1rem',
  whiteSpace: 'nowrap',
  paddingBottom: '1rem',
  textDecoration: 'none',

  [TABLET_BP_DOWN]: {
    display: 'inline-block',
    padding: '0rem 0.5rem 0.5rem 1.5rem',
    color: colorsV3.gray500,
  },
})

const MenuFakeLink = styled(MenuLink)({ cursor: 'default' }).withComponent(
  'span',
)
const DropdownMenuLink = styled(MenuLink)({
  display: 'block',
  whiteSpace: 'nowrap',
  padding: 0,
  paddingBottom: '1rem',

  [TABLET_BP_DOWN]: {
    fontSize: '1.2rem',
    padding: '0.5rem 0.5rem 0.5rem 1.5rem',
  },
})

const Toggler = styled('button')<{ isOpen: boolean }>(({ isOpen }) => ({
  position: 'relative',
  top: 2,
  appearance: 'none',
  background: 0,
  border: 0,
  padding: '1rem 0.5rem',
  fontSize: '1rem',
  color: 'inherit',

  svg: {
    fontSize: '1.125rem',
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 250ms',
  },

  [TABLET_BP_UP]: {
    top: 1,
    paddingTop: 0,
    paddingBottom: 0,
    svg: {
      fontSize: '0.75rem',
      transform: 'none',
    },
  },
}))

interface State {
  isOpen: boolean
  isClosing: boolean
  closeAnimationTimeout?: number
  closeTimeout?: number
}

interface Effects {
  open: () => void
  close: () => void
  closeWithoutDelay: () => void
}

export const SubMenuLinks: React.FC<{
  menu_items: readonly MenuItemType[]
}> = ({ menu_items }) => (
  <>
    {menu_items.map(({ _uid, link, label }) =>
      link?.cached_url ? (
        <MenuListItem key={_uid}>
          <DropdownMenuLink href={getStoryblokLinkUrl(link)}>
            {label}
          </DropdownMenuLink>
        </MenuListItem>
      ) : null,
    )}
  </>
)

export const MenuItem: React.FunctionComponent<{
  menuItem: MenuItemType
  inverseColor: boolean
}> = ({ menuItem, inverseColor }) => {
  const { menu_items = [], menu_item_groups = [] } = menuItem
  const hasSubMenuItems = menu_items.length > 0
  const hasSubMenuGroups = menu_item_groups.length > 0
  const hasSubMenus = hasSubMenuGroups || hasSubMenuItems

  return (
    <Container<State, {}, {}, Effects>
      initialState={{
        isOpen: false,
        isClosing: false,
        closeAnimationTimeout: undefined,
        closeTimeout: undefined,
      }}
      effects={{
        open: () => ({ setState, state }) => {
          if (state.closeTimeout) {
            window.clearTimeout(state.closeTimeout)
          }
          if (state.closeAnimationTimeout) {
            window.clearTimeout(state.closeAnimationTimeout)
          }
          setState({
            isOpen: true,
            isClosing: false,
            closeTimeout: undefined,
            closeAnimationTimeout: undefined,
          })
        },
        close: () => ({ setState }) => {
          setState({
            closeTimeout: window.setTimeout(() => {
              setState({
                isOpen: false,
                isClosing: false,
                closeTimeout: undefined,
                closeAnimationTimeout: undefined,
              })
            }, 500),
            closeAnimationTimeout: window.setTimeout(() => {
              setState({ isClosing: true })
            }, 250),
          })
        },
        closeWithoutDelay: () => ({ setState }) => {
          setState({
            isClosing: true,
            closeTimeout: window.setTimeout(() => {
              setState({
                isClosing: false,
                isOpen: false,
                closeTimeout: undefined,
              })
            }, 250),
          })
        },
      }}
    >
      {({ isOpen, isClosing, open, close, closeWithoutDelay }) => (
        <MenuListItem
          key={menuItem._uid}
          onMouseOver={() => {
            open()
          }}
          onMouseOut={() => close()}
        >
          {menuItem.link && menuItem.link.cached_url ? (
            <MenuLink
              inverseColor={inverseColor}
              href={getStoryblokLinkUrl(menuItem.link)}
            >
              {menuItem.label}
            </MenuLink>
          ) : (
            <MenuFakeLink inverseColor={inverseColor}>
              {menuItem.label}
            </MenuFakeLink>
          )}

          {hasSubMenus && (
            <>
              <Toggler
                onClick={isOpen ? closeWithoutDelay : open}
                isOpen={isOpen}
              >
                <Chevron />
              </Toggler>

              <AnimateHeight height={isOpen && !isClosing ? 'auto' : 0}>
                {hasSubMenuItems && (
                  <DropdownMenuContainer isOpen={isOpen} isClosing={isClosing}>
                    <DropdownMenuItemList>
                      <SubMenuLinks menu_items={menu_items} />
                    </DropdownMenuItemList>
                  </DropdownMenuContainer>
                )}

                {hasSubMenuGroups && (
                  <DropdownMenuContainer
                    isOpen={isOpen}
                    isClosing={isClosing}
                    hasMenuGroups={true}
                  >
                    {menu_item_groups.map(
                      ({ label, link, menu_items, _uid }) => (
                        <DropdownMenuItemList key={_uid}>
                          <GroupLabelListItem>
                            {link?.cached_url ? (
                              <MenuGroupLabel href={getStoryblokLinkUrl(link)}>
                                {label}
                              </MenuGroupLabel>
                            ) : (
                              <MenuGroupLabel as="span">{label}</MenuGroupLabel>
                            )}
                          </GroupLabelListItem>
                          <SubMenuLinks menu_items={menu_items} />
                        </DropdownMenuItemList>
                      ),
                    )}
                  </DropdownMenuContainer>
                )}
              </AnimateHeight>
            </>
          )}
        </MenuListItem>
      )}
    </Container>
  )
}
