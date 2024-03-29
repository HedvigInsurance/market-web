import styled from '@emotion/styled'
import { colorsV3, HedvigLogo, HedvigSymbol } from '@hedviginsurance/brand'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocale } from 'context/LocaleContext'
import { ContentWrapper, MOBILE_BP_DOWN } from 'components/blockHelpers'
import { ButtonLink, ButtonStyleType } from 'components/Button/Button'
import { Togglable } from 'components/containers/Togglable'
import {
  GlobalStory,
  GlobalStoryContainer,
  LinkComponent,
} from 'storyblok/StoryContainer'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import {
  BaseBlockProps,
  MinimalColorComponent,
  minimalColorComponentColors,
} from 'blocks/BaseBlockProps'
import { LanguagePicker } from './LanguagePicker'
import { MenuItem } from './MenuItem'
import { Burger, TABLET_BP_DOWN, TABLET_BP_UP, DESKTOP_BP_UP } from './mobile'
import { Banner } from './Banner'

export const WRAPPER_HEIGHT = '5rem'
export const MOBILE_WRAPPER_HEIGHT = '4.5rem'
export const HEADER_VERTICAL_PADDING = '1.2rem'
export const TOGGLE_TRANSITION_TIME = 250

const isBelowScrollThreshold = () =>
  typeof window !== 'undefined' && window.scrollY > 20

const HeaderWrapper = styled('header')({
  position: 'sticky',
  top: 0,
  zIndex: 100,
})

const HeaderMain = styled('div')<{
  inverse: boolean
  open: boolean
  sticky: boolean
}>(({ inverse, open }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: WRAPPER_HEIGHT,
  zIndex: 100,
  color: inverse ? colorsV3.gray100 : colorsV3.gray900,
  transition: 'color 300ms',

  [TABLET_BP_DOWN]: {
    color: colorsV3.gray100,
    bottom: open ? 0 : undefined,
  },
}))

const Filler = styled('div')({
  height: MOBILE_WRAPPER_HEIGHT,
  [TABLET_BP_UP]: {
    height: WRAPPER_HEIGHT,
  },
})

const HeaderContentWrapper = styled(ContentWrapper)({
  [MOBILE_BP_DOWN]: {
    padding: '0 1rem',
  },
})

const HeaderBackgroundFiller = styled('div')<{ transparent: boolean }>(
  ({ transparent }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    height: MOBILE_WRAPPER_HEIGHT,
    opacity: transparent ? 0 : 1,
    backgroundColor: colorsV3.gray900,
    transitionDuration: '300ms',
    transitionProperty: 'opacity, background-color',

    [TABLET_BP_UP]: {
      height: WRAPPER_HEIGHT,
      backgroundColor: colorsV3.gray100,
    },
  }),
)

const InnerHeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: MOBILE_WRAPPER_HEIGHT,
  [TABLET_BP_UP]: {
    height: WRAPPER_HEIGHT,
  },
  padding: HEADER_VERTICAL_PADDING + ' 0',
})

const Menu = styled('div')<{ open: boolean }>(({ open }) => ({
  display: 'flex',
  [TABLET_BP_DOWN]: {
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 101,
    width: '100%',
    height: open ? '100vh' : 0,
    top: 0,
    bottom: 0,
    right: 0,
    paddingTop: 0,
    background: open ? colorsV3.gray900 : 'transparent',
    transitionDuration: `${TOGGLE_TRANSITION_TIME}ms`,
    transitionProperty: 'background-color, height',
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch',
  },
}))

const MenuList = styled('ul')<{ open: boolean }>(({ open }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',

  [TABLET_BP_DOWN]: {
    display: 'block',
    transitionDuration: `${TOGGLE_TRANSITION_TIME}ms`,
    transitionProperty: 'opacity',
    opacity: open ? 1 : 0,
  },
}))

const DesktopLogo = styled('div')({
  display: 'none',
  [TABLET_BP_UP]: {
    display: 'flex',
  },
})

const MobileLogo = styled('div')({
  position: 'relative',
  zIndex: 102,
  [TABLET_BP_UP]: {
    display: 'none',
  },
})

const LogoLink = styled('a')<{
  inverse: boolean
}>(({ inverse }) => ({
  display: 'flex',
  color: inverse ? colorsV3.gray100 : colorsV3.gray900,
  transition: 'color 300ms',

  svg: {
    height: '100%',
  },
}))

const ButtonWrapper = styled('div')({
  paddingLeft: '2rem',

  [DESKTOP_BP_UP]: {
    paddingLeft: '3rem',
  },

  [TABLET_BP_DOWN]: {
    paddingTop: '1.5rem',
    paddingLeft: '2rem',
    paddingRight: '1rem',
    paddingBottom: HEADER_VERTICAL_PADDING,
  },

  [MOBILE_BP_DOWN]: {
    paddingLeft: '1rem',
  },
})

const LeftContainer = styled('div')({
  display: 'flex',
})

const MobileButtonWrapper = styled('div')({
  display: 'inline-block',
  width: '100%',
  marginBottom: '7rem',
  [TABLET_BP_UP]: {
    display: 'none',
  },
})

const DesktopButtonWrapper = styled('div')({
  display: 'none',
  [TABLET_BP_UP]: {
    display: 'inline-block',
  },
})

const Wordmark = styled('a')({
  display: 'block',
  width: '1.75rem',
  height: '1.75rem',
  zIndex: 102,
})

interface HeaderBlockProps extends BaseBlockProps {
  is_transparent: boolean
  inverse_colors: boolean
  override_cta_link?: LinkComponent | null
  override_cta_label?: string | null
  cta_color?: MinimalColorComponent
  cta_style?: ButtonStyleType
  hide_menu?: boolean
  hide_global_banner?: boolean
  override_mobile_header_cta_label?: string | null
  override_mobile_header_cta_link?: LinkComponent | null
  mobile_header_cta_color?: MinimalColorComponent
  mobile_header_cta_style?: ButtonStyleType
  use_business_menu?: boolean
}

enum InverseColors {
  DEFAULT = 'standard-inverse',
  INVERSE = 'standard',
}

export const Header: React.FC<{ story: GlobalStory } & HeaderBlockProps> = (
  props,
) => {
  const showBanner =
    props.story.content.show_banner &&
    props.story.content.banner_text &&
    !props.hide_global_banner

  const { currentLocale } = useLocale()
  const [isBelowThreshold, setIsBelowThreshold] = useState<boolean>(false)
  const [buttonColor, setButtonColor] = useState<
    minimalColorComponentColors | undefined
  >(
    props.inverse_colors && props.is_transparent
      ? InverseColors.DEFAULT
      : props.cta_color?.color,
  )

  const inverseColor =
    props.is_transparent && props.inverse_colors && !isBelowThreshold

  const headerMenu = props.use_business_menu
    ? props.story.content.header_menu_business
    : props.story.content.header_menu_items

  const updateHeader = useCallback(() => {
    if (isBelowScrollThreshold()) {
      setIsBelowThreshold(true)
      if (props.inverse_colors && props.is_transparent) {
        setButtonColor(InverseColors.INVERSE)
      }
      return
    }

    setIsBelowThreshold(false)
    if (props.inverse_colors && props.is_transparent) {
      setButtonColor(InverseColors.DEFAULT)
    }
  }, [props.inverse_colors, props.is_transparent])

  useEffect(() => {
    updateHeader()
    window.addEventListener('scroll', updateHeader)

    return () => {
      if (!props.is_transparent) {
        return
      }
      window.removeEventListener('scroll', updateHeader)
    }
  }, [updateHeader, props.is_transparent])

  return (
    <>
      {showBanner && (
        <Banner
          color={props.story.content.banner_color}
          text={props.story.content.banner_text}
        />
      )}
      <HeaderWrapper>
        {!props.is_transparent && <Filler />}
        <Togglable>
          {({ isOpen, isClosing, toggleOpen }) => (
            <HeaderMain
              inverse={inverseColor}
              open={isOpen || isClosing}
              sticky={isBelowThreshold}
            >
              <HeaderBackgroundFiller
                transparent={props.is_transparent && !isBelowThreshold}
              />
              <HeaderContentWrapper brandPivot fullWidth>
                <InnerHeaderWrapper>
                  <LeftContainer>
                    <Burger
                      isOpen={isOpen}
                      isClosing={isClosing}
                      onClick={toggleOpen}
                      preventInverse={props.inverse_colors && isOpen}
                    />

                    <DesktopLogo>
                      <LogoLink
                        inverse={inverseColor}
                        href={'/' + currentLocale.label}
                      >
                        <HedvigLogo width={94} />
                      </LogoLink>
                    </DesktopLogo>
                  </LeftContainer>

                  <MobileLogo>
                    <Wordmark href={'/' + currentLocale.label}>
                      <HedvigSymbol size={28} />
                    </Wordmark>
                  </MobileLogo>
                  {!props.hide_menu && (
                    <Menu open={isOpen}>
                      <MenuList open={isOpen}>
                        {(headerMenu ?? []).map((menuItem) => (
                          <MenuItem
                            inverseColor={inverseColor}
                            menuItem={menuItem}
                            key={menuItem._uid}
                          />
                        ))}
                      </MenuList>
                      <LanguagePicker currentLocale={currentLocale} />
                      <MobileButtonWrapper>
                        <>
                          {(() => {
                            const mobileCtaLabel =
                              props.override_mobile_header_cta_label ||
                              props.story.content.cta_label
                            const mobileCtaColor =
                              props.mobile_header_cta_color?.color ||
                              'standard-inverse'

                            if (
                              props.override_mobile_header_cta_link?.cached_url
                            ) {
                              return (
                                <ButtonWrapper>
                                  <ButtonLink
                                    styleType={props.mobile_header_cta_style}
                                    fullWidth={true}
                                    href={getStoryblokLinkUrl(
                                      props.override_mobile_header_cta_link,
                                    )}
                                    color={mobileCtaColor}
                                  >
                                    {mobileCtaLabel}
                                  </ButtonLink>
                                </ButtonWrapper>
                              )
                            }

                            if (props.story.content.show_cta) {
                              return (
                                <ButtonWrapper>
                                  <ButtonLink
                                    styleType={props.mobile_header_cta_style}
                                    fullWidth={true}
                                    href={getStoryblokLinkUrl(
                                      props.story.content.cta_link,
                                    )}
                                    color={mobileCtaColor}
                                  >
                                    {mobileCtaLabel}
                                  </ButtonLink>
                                </ButtonWrapper>
                              )
                            }

                            return null
                          })()}
                        </>
                      </MobileButtonWrapper>

                      <DesktopButtonWrapper>
                        {(() => {
                          const ctaLabel =
                            props.override_cta_label ||
                            props.story.content.cta_label

                          if (props.override_cta_link?.cached_url) {
                            return (
                              <ButtonWrapper>
                                <ButtonLink
                                  styleType={props.cta_style}
                                  color={buttonColor}
                                  fullWidth={true}
                                  href={getStoryblokLinkUrl(
                                    props.override_cta_link,
                                  )}
                                >
                                  {ctaLabel}
                                </ButtonLink>
                              </ButtonWrapper>
                            )
                          }

                          if (props.story.content.show_cta) {
                            return (
                              <ButtonWrapper>
                                <ButtonLink
                                  styleType={props.cta_style}
                                  color={buttonColor}
                                  href={getStoryblokLinkUrl(
                                    props.story.content.cta_link,
                                  )}
                                >
                                  {ctaLabel}
                                </ButtonLink>
                              </ButtonWrapper>
                            )
                          }

                          return null
                        })()}
                      </DesktopButtonWrapper>
                    </Menu>
                  )}
                </InnerHeaderWrapper>
              </HeaderContentWrapper>
            </HeaderMain>
          )}
        </Togglable>
      </HeaderWrapper>
    </>
  )
}

export const HeaderBlock: React.FunctionComponent<HeaderBlockProps> = (
  headerBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Header story={globalStory} {...headerBlockProps} />}
  </GlobalStoryContainer>
)
