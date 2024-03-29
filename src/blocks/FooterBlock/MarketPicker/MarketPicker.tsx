import styled from '@emotion/styled'
import React, { useRef, useState, useCallback } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { Button } from 'components/Button/Button'
import { locales, LocaleData } from 'l10n/locales'
import {
  getMarketsInLocalLang,
  getMarketsInEnglish,
  checkIsInEnglish,
} from 'l10n/l10n-utils'
import { Globe } from 'components/icons/Globe'
import { Chevron } from 'components/icons/Chevron'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import { useClickOutside } from './useClickOutside'

const Wrapper = styled.div`
  position: relative;
  width: 15rem;
`

const MarketPickerButton = styled(Button)`
  display: flex;
  align-items: center;

  ${MOBILE_BP_UP} {
    width: 100%;
  }
`

const GlobeIcon = styled(Globe)`
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
  margin-left: -0.875rem;
`

const ButtonLabel = styled.div`
  flex: 1;
  padding-left: 0.5rem;
  text-align: left;
`

const Menu = styled.ul`
  position: absolute;
  width: 100%;
  background: ${colorsV3.gray900};
  border: 1px solid ${colorsV3.white};
  border-radius: 8px;
  padding: 0;
  margin: 0.5rem 2px 0;
  max-width: 15rem;
`

const MenuItem = styled.li`
  list-style: none;
  height: 3rem;
`

const MenuItemLink = styled.a`
  text-decoration: none;
  display: block;
  height: 100%;
  padding: 0.75rem 1.5rem;

  &:hover {
    opacity: 0.7;
  }
`

interface MarketPickerProps {
  currentLocale: LocaleData
}

const sortMarketsAlphabetically = (markets: LocaleData[]) => {
  return markets.sort((a, b) => (a.label < b.label ? -1 : 1))
}

export const MarketPicker: React.FC<MarketPickerProps> = ({
  currentLocale,
}) => {
  const wrapperRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const handleClose = useCallback(() => setIsOpen(false), [])
  useClickOutside(wrapperRef, handleClose)

  const currentMarketName = currentLocale.marketName
  const marketsInLocalLang = getMarketsInLocalLang(locales)
  const marketsInEnglish = getMarketsInEnglish(locales)

  const markets = checkIsInEnglish(currentLocale)
    ? sortMarketsAlphabetically(marketsInEnglish)
    : sortMarketsAlphabetically(marketsInLocalLang)

  return (
    <Wrapper ref={wrapperRef}>
      <MarketPickerButton
        size="sm"
        styleType="outlined"
        color="standard-inverse"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <GlobeIcon />
        <ButtonLabel>{currentMarketName}</ButtonLabel>
        <Chevron />
      </MarketPickerButton>

      <Menu
        style={{ display: isOpen ? 'block' : 'none' }}
        role="listbox"
        tabIndex={-1}
      >
        {markets.map((market) => (
          <MenuItem
            key={market.label}
            role="option"
            aria-selected={market.marketName === currentMarketName}
          >
            <MenuItemLink
              href={`/${market.marketLabel}`}
              hrefLang={market.hrefLang}
            >
              {market.marketName}
            </MenuItemLink>
          </MenuItem>
        ))}
      </Menu>
    </Wrapper>
  )
}
