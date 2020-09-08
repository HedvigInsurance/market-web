import React from 'react'
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
} from 'react-select'
import { minimalColorComponentColors } from 'blocks/BaseBlockProps'
import { getMinimalColorStyles } from '../blockHelpers'
import { DropdownIndicator } from './components/DropdownIndicator'

const selectHeight = '3rem'
const selectPadding = '1.5rem'

interface SelectProps extends ReactSelectProps {
  color?: minimalColorComponentColors
}

export const getSelectStyling = (theme: any): StylesConfig => ({
  option: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    minHeight: selectHeight,
    padding: '0.75rem ' + selectPadding,
    color: theme.color,
    cursor: 'pointer',
    textAlign: 'center',
    '&:hover': { opacity: 0.7 },
    '&, &:active': { backgroundColor: 'transparent' },
  }),
  control: (provided) => ({
    ...provided,
    minHeight: selectHeight,
    borderColor: theme.color + ' !important',
    borderRadius: '8px',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    textAlign: 'center',
  }),
  menu: (provided) => ({
    ...provided,
    boxShadow: 'none',
    borderRadius: '8px',
    minWidth: '100%',
    border: '1px solid ' + theme.color,
    backgroundColor: theme.background,
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0',
    maxWidth: '100%',
  }),
  valueContainer: (provided) => ({
    ...provided,
    paddingLeft: selectPadding,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    marginRight: '0.5rem',
    '&:hover, &:active': { color: theme.color },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: theme.color + ' !important',
    backgroundColor: 'transparent',
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: theme.color,
  }),
})

export interface OptionType<T = string> {
  value: T
  label: string
}

export const Select: React.FC<SelectProps> = ({
  color = 'standard',
  ...props
}) => {
  const themeColors = getMinimalColorStyles(color)
  const styles = getSelectStyling(themeColors)
  return (
    <ReactSelect
      components={{
        DropdownIndicator,
      }}
      hideSelectedOptions={false}
      closeMenuOnSelect={true}
      blurInputOnSelect={false}
      styles={styles}
      {...props}
    />
  )
}
