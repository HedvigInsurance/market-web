import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'
import { colorComponentColors } from '../blocks/BaseBlockProps'

const colorMap = {
  standard: {
    color: colors.OFF_BLACK_DARK,
    background: 'transparent',
  },
  blue: {
    color: colors.WHITE,
    background: colors.BLACK_PURPLE,
  },
  'blue-dark': {
    color: colors.WHITE,
    background: colors.DARK_PURPLE,
  },
  'pink-light': {
    color: colors.OFF_BLACK_DARK,
    background: colors.PINK_LIGHT,
  },
  'off-white': {
    color: colors.OFF_BLACK_DARK,
    background: colors.OFF_WHITE,
  },
  green: {
    color: colors.WHITE,
    background: colors.GREEN,
  },
  purple: {
    color: colors.WHITE,
    background: colors.PURPLE,
  },
}

const getColorStyles = (color?: colorComponentColors) =>
  colorMap[color || 'standard'] || colorMap.standard

export const SectionWrapper = styled('section')(
  ({ color }: { color?: colorComponentColors }) => ({
    padding: '7rem 0',
    ...getColorStyles(color),
  }),
)

export const CONTENT_GUTTER = '2rem'
export const CONTENT_GUTTER_MOBILE = '1rem'
export const MOBILE_BP_UP = '@media (min-width: 481px)'
export const MOBILE_BP_DOWN = '@media (max-width: 480px)'
export const ContentWrapper = styled('div')({
  width: '100%',
  maxWidth: 1200,
  padding: '0 ' + CONTENT_GUTTER,
  margin: '0 auto',

  [MOBILE_BP_DOWN]: {
    padding: '0 ' + CONTENT_GUTTER_MOBILE,
  },
})
