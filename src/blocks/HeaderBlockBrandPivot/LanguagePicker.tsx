import styled from '@emotion/styled'
import { TABLET_BP_UP } from 'components/blockHelpers'
import React from 'react'
import { getCurrentMarket } from 'utils/CurrentLocale'

type LanguagePickerProps = {
  currentLanguage: string
}

const MenuListItem = styled.li`
  position: relative;
  margin: 0;
  padding: 0;

  ${TABLET_BP_UP} {
    display: flex;
    padding-left: 1.25rem;
  }
`

const Lang = styled.a<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
  transition: opacity 150ms;

  &:hover {
    opacity: 1;
  }

  &:first-of-type {
    padding-right: calc(0.375rem + 1px);
  }

  &:last-of-type {
    padding-left: 0.375rem;
  }

  &:first-of-type:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    display: inline-flex;
    width: 1px;
    height: 0.875rem;
    background-color: currentColor;
  }
`

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  currentLanguage,
}) => {
  const market = getCurrentMarket(currentLanguage)
  const activeLocale = (locale: string) => locale === currentLanguage
  return (
    <MenuListItem>
      {market === 'no' && (
        <>
          <Lang active={activeLocale('no')} href="/no">
            No
          </Lang>
          <Lang active={activeLocale('no-en')} href="/no-en">
            En
          </Lang>
        </>
      )}
      {market === 'se' && (
        <>
          <Lang active={activeLocale('se')} href="/se">
            Sv
          </Lang>
          <Lang active={activeLocale('se-en')} href="/se-en">
            En
          </Lang>
        </>
      )}
    </MenuListItem>
  )
}
