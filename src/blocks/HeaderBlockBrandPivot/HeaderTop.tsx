import styled from '@emotion/styled'
import { colorsV3, fonts } from '@hedviginsurance/brand'
import { MOBILE_BP_UP, SITE_MAX_WIDTH } from 'components/blockHelpers'
import { Chat } from 'components/icons/Chat'
import { Globe } from 'components/icons/Globe'
import React, { useState } from 'react'
import { TABLET_BP_UP } from './mobile'
import { Sweden } from 'components/icons/flags/Sweden'
import { Norway } from 'components/icons/flags/Norway'
import { ContextContainer } from 'components/containers/ContextContainer'
import { getMarketLocale } from 'utils/CurrentLocale'

interface HeaderTopProps {
  transparent: boolean
  inverse: boolean
}

const Wrapper = styled.div<{ transparent: boolean }>`
  position: absolute;
  width: 100%;
  height: 2.5rem;
  padding-top: 1px;
  font-size: 0.875rem;
  font-family: ${fonts.FAVORIT};
  color: ${(props) => (props.transparent ? 'inherit' : colorsV3.gray100)};
  background-color: ${(props) =>
    props.transparent ? 'transparent' : colorsV3.gray900};
  border-bottom: 1px solid
    ${(props) => (props.transparent ? colorsV3.gray700 : colorsV3.gray900)};
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  margin-left: auto;
  margin-right: auto;
  ${SITE_MAX_WIDTH}

  ${MOBILE_BP_UP} {
    padding: 0 2rem;
  }

  ${TABLET_BP_UP} {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;

  ${TABLET_BP_UP} {
    margin-right: 4rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const MarketPicker = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const MarketPickerToggle = styled.button`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  border: none;
  color: inherit;
  background: transparent;
  letter-spacing: 0.5px;
  cursor: pointer;

  &:focus {
    outline: 0;
  }

  &:after {
    display: inline-block;
    content: '';
    margin-top: 1px;
    margin-left: 0.5rem;
    border-width: 6px 6px 0 6px;
    border-color: currentColor transparent transparent transparent;
    border-style: solid;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const MarketPickerWrapper = styled.div<{ isOpen: boolean; inverse: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: calc(100vw - 48px);
  max-width: 330px;
  z-index: 103;
  background-color: ${(props) =>
    props.inverse ? colorsV3.gray100 : colorsV3.gray700};
  color: ${(props) => (props.inverse ? colorsV3.gray900 : colorsV3.gray100)};
  border-radius: 0.5rem;

  ${TABLET_BP_UP} {
    left: auto;
    right: 0;
  }
`

const MarketList = styled.ul`
  display: block;
  margin: 0;
  padding: 2.5rem 1.5rem;
`

const MarketItem = styled.li`
  display: block;
  margin-bottom: 2rem;
  color: inherit;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const MarketPrimaryLink = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    /* color: ${colorsV3.gray700}; */
  }
`

const MarketTitle = styled.span`
  display: block;
  margin-left: 1rem;
  font-size: 1.25rem;
`

const MarketLocales = styled.ul`
  display: flex;
  margin: 0 0 0 2.5rem;
  padding: 0;
`

const MarketLocale = styled.li`
  display: flex;
`

const MarketLink = styled.a`
  padding: 0 1rem;
  color: inherit;
  text-decoration: none;
`

const Divider = styled.span`
  display: block;
  content: '';
  width: 1px;
  height: 1.25rem;
  background-color: currentColor;
`

export const HeaderTop: React.FC<HeaderTopProps> = ({
  transparent,
  inverse,
}) => {
  const [openMarketPicker, toggleMarketPicker] = useState<boolean>(false)

  const toggleHandler = () => toggleMarketPicker(!openMarketPicker)

  return (
    <ContextContainer>
      {(context) => (
        <Wrapper transparent={transparent}>
          <Content>
            <MarketPicker>
              <MarketPickerToggle onClick={toggleHandler}>
                <Globe size="1.5rem" />
                <span>{getMarketLocale(context.lang)}</span>
              </MarketPickerToggle>
              <MarketPickerWrapper isOpen={openMarketPicker} inverse={inverse}>
                <MarketList>
                  <MarketItem>
                    <MarketPrimaryLink href="/se">
                      <Sweden />
                      <MarketTitle>Sverige</MarketTitle>
                    </MarketPrimaryLink>
                    <MarketLocales>
                      <MarketLocale>
                        <MarketLink href="/se">Svenska</MarketLink>
                      </MarketLocale>
                      <Divider />
                      <MarketLocale>
                        <MarketLink href="/se-en">English</MarketLink>
                      </MarketLocale>
                    </MarketLocales>
                  </MarketItem>

                  <MarketItem>
                    <MarketPrimaryLink href="/no">
                      <Norway />
                      <MarketTitle>Norge</MarketTitle>
                    </MarketPrimaryLink>
                    <MarketLocales>
                      <MarketLocale>
                        <MarketLink href="/no">Norsk</MarketLink>
                      </MarketLocale>
                      <Divider />
                      <MarketLocale>
                        <MarketLink href="/no-en">English</MarketLink>
                      </MarketLocale>
                    </MarketLocales>
                  </MarketItem>
                </MarketList>
              </MarketPickerWrapper>
            </MarketPicker>
            <ContactLink href={`/${context.lang}/contact`}>
              <Chat size="1.5rem" />
              Kontakt
            </ContactLink>
          </Content>
        </Wrapper>
      )}
    </ContextContainer>
  )
}
