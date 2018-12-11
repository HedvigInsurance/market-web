import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { Mount, Unmount } from 'react-lifecycle-components'
import { AppLink } from '../../components/AppLink'
import { ContentWrapper, TABLET_BP_DOWN } from '../../components/blockHelpers'
import { ButtonLink } from '../../components/buttons'
import { Togglable } from '../../components/containers/Togglable'
import { HedvigWordmark } from '../../components/icons/HedvigWordmark'
import {
  GlobalStory,
  GlobalStoryContainer,
} from '../../storyblok/StoryContainer'
import { BaseBlockProps } from '../BaseBlockProps'
import { MenuItem } from './MenuItem'
import { Burger } from './mobile'

export const WRAPPER_HEIGHT = '5rem'
export const HEADER_VERTICAL_PADDING = '1.5rem'
export const TOGGLE_TRANSITION_TIME = 250

const isBelowScrollThreshold = () =>
  typeof window !== 'undefined' && window.scrollY > 20

const Wrapper = styled('div')(
  ({ inverse, open }: { inverse: boolean; open: boolean }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    color: inverse && !isBelowScrollThreshold() ? colors.WHITE : 'inherit',
    transition: 'color 300ms',

    [TABLET_BP_DOWN]: {
      bottom: open ? 0 : undefined,
    },
  }),
)
const Filler = styled('div')({
  height: WRAPPER_HEIGHT,
})
const HeaderBackgroundFiller = styled('div')(
  ({ transparent }: { transparent: boolean }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    height: WRAPPER_HEIGHT,
    backgroundColor: colors.WHITE,
    opacity: transparent && !isBelowScrollThreshold() ? 0 : 1,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'opacity 300ms',
  }),
)

const InnerHeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: WRAPPER_HEIGHT,
  padding: HEADER_VERTICAL_PADDING + ' 0',
})
const Menu = styled('ul')(({ open }: { open: boolean }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  listStyle: 'none',

  [TABLET_BP_DOWN]: {
    position: 'absolute',
    display: 'block',
    zIndex: 101,
    width: '80%',
    height: '100vh',
    top: 0,
    bottom: 0,
    left: open ? '20%' : '100%',
    paddingTop: `calc(${WRAPPER_HEIGHT} + ${HEADER_VERTICAL_PADDING})`,
    fontSize: 18,
    background: colors.WHITE,
    transition: `left ${TOGGLE_TRANSITION_TIME}ms`,
    color: colors.OFF_BLACK_DARK,
    overflow: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
}))

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
    paddingBottom: HEADER_VERTICAL_PADDING,
  },
})

interface HeaderBlockProps extends BaseBlockProps {
  is_transparent: boolean
  inverse_colors: boolean
}

class Header extends React.PureComponent<
  { story: GlobalStory } & HeaderBlockProps
> {
  private backgroundFillerRef: null | HTMLDivElement = null
  private wrapperRef: null | HTMLDivElement = null

  public render() {
    return (
      <>
        <Mount
          on={() => {
            if (!this.props.is_transparent) {
              return
            }

            setTimeout(() => {
              this.updateHeaderTransparency() // update the scroll animation after mount because the server doesn't know scroll position
            }, 1)
            window.addEventListener('scroll', this.updateHeaderTransparency)
          }}
        />
        <Unmount
          on={() => {
            if (!this.props.is_transparent) {
              return
            }

            window.removeEventListener('scroll', this.updateHeaderTransparency)
          }}
        />
        {!this.props.is_transparent && <Filler />}

        <Togglable>
          {({ isOpen, isClosing, toggleOpen }) => (
            <Wrapper
              inverse={this.props.is_transparent && this.props.inverse_colors}
              open={isOpen || isClosing}
              innerRef={(r) => {
                this.wrapperRef = r
              }}
            >
              <HeaderBackgroundFiller
                transparent={this.props.is_transparent}
                innerRef={(r) => {
                  this.backgroundFillerRef = r
                }}
              />
              <ContentWrapper>
                <InnerHeaderWrapper>
                  <LogoLink href="/">
                    <HedvigWordmark height={30} />
                  </LogoLink>

                  <Burger
                    isOpen={isOpen}
                    isClosing={isClosing}
                    onClick={toggleOpen}
                    preventInverse={this.props.inverse_colors && isOpen}
                  />
                  <Menu open={isOpen}>
                    {(this.props.story.content.header_menu_items || []).map(
                      (menuItem) => (
                        <MenuItem menuItem={menuItem} key={menuItem._uid} />
                      ),
                    )}

                    {this.props.story.content.show_cta && (
                      <AppLink>
                        {({ link, handleClick }) => (
                          <ButtonWrapper>
                            <ButtonLink
                              size="sm"
                              bold
                              href={link}
                              onClick={handleClick}
                            >
                              {this.props.story.content.cta_label}
                            </ButtonLink>
                          </ButtonWrapper>
                        )}
                      </AppLink>
                    )}
                  </Menu>
                </InnerHeaderWrapper>
              </ContentWrapper>
            </Wrapper>
          )}
        </Togglable>
      </>
    )
  }

  private updateHeaderTransparency = () => {
    if (!this.backgroundFillerRef || !this.wrapperRef) {
      return
    }

    if (isBelowScrollThreshold()) {
      this.backgroundFillerRef.style.opacity = '1'
      this.wrapperRef.style.color = 'inherit'
      return
    }

    this.backgroundFillerRef!.style.opacity = '0'

    if (this.props.inverse_colors) {
      this.wrapperRef!.style.color = colors.WHITE
    }
  }
}

export const HeaderBlock: React.FunctionComponent<HeaderBlockProps> = (
  headerBlockProps,
) => (
  <GlobalStoryContainer>
    {({ globalStory }) => <Header story={globalStory} {...headerBlockProps} />}
  </GlobalStoryContainer>
)
