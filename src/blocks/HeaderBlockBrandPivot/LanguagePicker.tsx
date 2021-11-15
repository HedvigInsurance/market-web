import styled from '@emotion/styled'
import React from 'react'
import { MOBILE_BP_UP } from 'components/blockHelpers'
import { LocaleData } from 'src/l10n/locales'
import { getAssociatedLocales } from 'src/l10n/l10n-utils'
import { TABLET_BP_UP } from './mobile'

interface LanguagePickerProps {
  currentLocale: LocaleData
}

const MenuListItem = styled.li`
  display: flex;
  position: relative;
  margin: 5.25rem 0 auto 0;
  padding-left: 1.5rem;
  order: -1;

  ${MOBILE_BP_UP} {
    padding-left: 2rem;
  }

  ${TABLET_BP_UP} {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 1.25rem;
    order: 0;
  }
`

const Lang = styled.a<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  transition: opacity 150ms;
  pointer-events: ${({ active }) => (active ? 'none' : 'auto')};

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
  currentLocale,
}) => {
  const associatedLocales: LocaleData[] = getAssociatedLocales(currentLocale)

  return (
    <MenuListItem>
      {associatedLocales.map(({ label, langLabel }) => (
        <Lang
          key={label}
          active={label === currentLocale.label}
          href={'/' + label}
        >
          {langLabel}
        </Lang>
      ))}
    </MenuListItem>
  )
}
