import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import Cookies from 'js-cookie'
import React, { useState, useEffect } from 'react'
import { CONTENT_GUTTER, CONTENT_MAX_WIDTH } from 'components/blockHelpers'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'

const OuterWrapper = styled('div')<{ visible: boolean; closing: boolean }>(
  ({ visible, closing }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: colorsV2.white,
    opacity: visible && !closing ? 1 : 0,
    transform: visible && !closing ? 'translateY(0)' : 'translateY(5%)',
    transition: 'opacity 300ms, transform 300ms',
    borderTop: '1px solid ' + colorsV2.lightgray,
    boxShadow: '-5px 0 5px rgba(50, 50, 50, 0.2)',
    zIndex: 9999999999,
  }),
)
const InnerWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: CONTENT_GUTTER,

  ...CONTENT_MAX_WIDTH,
})

const ContentWrapper = styled('div')({
  fontSize: '0.8rem',
  paddingRight: '2rem',
  '> p': {
    margin: 0,
  },
})
const CloseButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: '3rem',
  padding: 0,
  fontSize: '2rem',
  background: 'transparent',
  color: colorsV2.darkgray,
  border: '1px solid ' + colorsV2.darkgray,
  cursor: 'pointer',
  borderRadius: '100%',
  flexShrink: 0,
  flexGrow: 0,
  '&:hover, &:focus': {
    outline: 'none',
    boxShadow: 'none',
  },
})

export const CookieConsent: React.FC = () => {
  const [isVisible, setVisible] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  useEffect(() => {
    if (!Cookies.get()._hvcookie) {
      setVisible(true)
    }
  }, [Cookies.get()?._hvcookie])

  if (!isVisible) {
    return null
  }

  return (
    <OuterWrapper visible={isVisible} closing={isClosing}>
      <InnerWrapper>
        <GlobalStoryContainer>
          {({ globalStory }) => (
            <ContentWrapper
              dangerouslySetInnerHTML={{
                __html: globalStory.content.cookie_consent_message?.html,
              }}
            />
          )}
        </GlobalStoryContainer>
        <CloseButton
          onClick={() => {
            setIsClosing(true)
            setTimeout(() => setVisible(false), 400)
            Cookies.set('_hvcookie', 'yes', { path: '/' })
          }}
        >
          &#x2715;
        </CloseButton>
      </InnerWrapper>
    </OuterWrapper>
  )
}
