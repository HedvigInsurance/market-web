import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React, { useState } from 'react'
import { ContextContainer } from 'components/containers/ContextContainer'
import { Chevron } from 'components/icons/Chevron'
import { Cross } from 'components/icons/Cross'
import { Norway } from 'components/icons/flags/Norway'
import { Sweden } from 'components/icons/flags/Sweden'
import { Globe } from 'components/icons/Globe'
import { getMarketLocale } from 'utils/CurrentLocale'
import { TABLET_BP_UP } from './mobile'

interface MarketPickerProps {
  transparent: boolean
  inverse: boolean
}

const MarketPickerContainer = styled.div<{ transparent: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => (props.transparent ? 'inherit' : colorsV3.gray100)};

  ${TABLET_BP_UP} {
    padding-left: 1.5rem;
  }
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

  svg:first-of-type {
    margin-right: 0.375rem;
  }

  svg:last-of-type {
    margin-left: 0.375rem;
    font-size: 0.75rem;
  }

  span {
    line-height: 1;
  }
`

const MarketPickerWrapper = styled.div<{ isOpen: boolean; inverse: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: 100vw;
  max-width: 270px;
  z-index: 103;
  background-color: ${(props) =>
    props.inverse ? colorsV3.gray100 : colorsV3.gray700};
  color: ${(props) => (props.inverse ? colorsV3.gray900 : colorsV3.gray100)};
  border-radius: 0.5rem;

  ${TABLET_BP_UP} {
    left: auto;
    right: 0;
    max-width: 300px;
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
`

const MarketTitle = styled.span`
  display: block;
  margin-left: 1rem;
  font-size: 1.25rem;

  :hover {
    opacity: 0.7;
  }
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

  :hover {
    opacity: 0.7;
  }
`

const Divider = styled.span`
  display: block;
  content: '';
  width: 1px;
  height: 1.25rem;
  background-color: currentColor;
`

const CloseButton = styled('button')`
  position: absolute;
  top: 1rem;
  right: 0.75rem;
  display: flex;
  width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: currentColor;
  background-color: transparent;
  border: none;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    opacity: 0.8;
  }

  svg {
    transform: rotate(45deg);
  }
`

export const MarketPicker: React.FC<MarketPickerProps> = ({
  inverse,
  transparent,
}) => {
  const [openMarketPicker, toggleMarketPicker] = useState<boolean>(false)

  const toggleHandler = () => toggleMarketPicker(!openMarketPicker)

  return (
    <ContextContainer>
      {(context) => (
        <MarketPickerContainer transparent={transparent}>
          <MarketPickerToggle onClick={toggleHandler}>
            <Globe size="1.5rem" />
            <span>{getMarketLocale(context.lang)}</span>
            <Chevron />
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
            <CloseButton onClick={toggleHandler}>
              <Cross size="1rem" />
            </CloseButton>
          </MarketPickerWrapper>
        </MarketPickerContainer>
      )}
    </ContextContainer>
  )
}
