import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { CONTENT_GUTTER, CONTENT_MAX_WIDTH } from 'components/blockHelpers'
import * as Cookies from 'js-cookie'
import * as React from 'react'
import { useLocation } from 'react-router'

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
  paddingRight: '1rem',
  maxWidth: 1000,
})
const CloseButton = styled('button')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: '3rem',
  padding: 0,
  paddingBottom: '0.4rem',
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
  const location = useLocation()
  const [isVisible, setVisible] = React.useState(false)
  const [isClosing, setIsClosing] = React.useState(false)
  React.useEffect(() => {
    if (!Cookies.get()._hvcookie) {
      setVisible(true)
    }
  }, [Cookies.get()?._hvcookie])

  if (!isVisible && !isClosing) {
    return null
  }

  return (
    <OuterWrapper visible={isVisible} closing={isClosing}>
      <InnerWrapper>
        <ContentWrapper>
          {/^\/en(\/|$)/.test(location.pathname) ? (
            <>
              We use <a href="/en/legal">cookies</a> to manage logins, to
              strengthen security and to improve the overall service for our
              members. If you don’t want us to use cookies, you can easily turn
              it off through your browser. <a href="/en/legal">Read more</a>
            </>
          ) : /^\/no(\/|$)/.test(location.pathname) ? (
            <>
              We use <a href="/en/legal">cookies</a> to manage logins, to
              strengthen security and to improve the overall service for our
              members. If you don’t want us to use cookies, you can easily turn
              it off through your browser. <a href="/en/legal">Read more</a>
            </>
          ) : (
            <>
              Vi använder <a href="/legal">cookies</a>, en liten datafil som
              lagras i din dator, för att hantera inloggningar, öka säkerheten
              för våra användare och förbättra de tjänster vi erbjuder. Om du
              inte vill att vi använder cookies kan du enkelt stänga av det i
              din browser. <a href="/legal">Läs mer</a>
            </>
          )}
        </ContentWrapper>
        <CloseButton
          onClick={() => {
            setIsClosing(true)
            setTimeout(() => setVisible(false), 400)
            Cookies.set('_hvcookie', 'yes', { path: '/' })
          }}
        >
          &times;
        </CloseButton>
      </InnerWrapper>
    </OuterWrapper>
  )
}
