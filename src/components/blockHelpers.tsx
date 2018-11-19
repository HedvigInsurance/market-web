import { colors } from '@hedviginsurance/brand'
import styled from 'react-emotion'
import { colorComponentColors } from '../blocks/BaseBlockProps'

const TMP_OFF_BLACK_DARK = '#141033' // TODO move this to brand package
const TMP_PINK_LIGHT = '#FFF3F2' // TODO move this to brand package

const getColorStyles = (color?: colorComponentColors) =>
  (({
    standard: {
      color: TMP_OFF_BLACK_DARK,
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
      color: TMP_OFF_BLACK_DARK,
      background: TMP_PINK_LIGHT,
    },
    'off-white': {
      color: TMP_OFF_BLACK_DARK,
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
  } as any)[color || 'standard'])

export const SectionWrapper = styled('section')(
  ({ color }: { color?: colorComponentColors }) => ({
    padding: '7rem 0',
    ...getColorStyles(color),
  }),
)

export const ContentWrapper = styled('div')({
  width: '100%',
  maxWidth: 1200,
  padding: '0 2rem',
  margin: '0 auto',

  '@media (max-width: 480px)': {
    padding: '0 1rem',
  },
})
