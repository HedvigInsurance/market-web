import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { RouteComponentProps, withRouter } from 'react-router'
import { SectionSize } from 'src/utils/SectionSize'
import { colorComponentColors } from '../blocks/BaseBlockProps'

export const CONTENT_GUTTER = '2rem'
export const CONTENT_GUTTER_MOBILE = '1rem'
export const MOBILE_BP_UP = '@media (min-width: 481px)'
export const MOBILE_BP_DOWN = '@media (max-width: 480px)'
export const TABLET_BP_DOWN = '@media (max-width: 800px)'
export const TABLET_BP_UP = '@media (min-width: 801px)'
export const GIANT_BP_UP = '@media (min-width: 1700px)'

export const CONTENT_MAX_WIDTH = {
  maxWidth: 1200,
  [GIANT_BP_UP]: {
    maxWidth: 1500,
  },
}

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
  'pink-dark': {
    color: colors.OFF_BLACK_DARK,
    background: colors.PINK,
  },
  'off-white': {
    color: colors.OFF_BLACK_DARK,
    background: colors.OFF_WHITE,
  },
  'off-black': {
    color: colors.WHITE,
    background: colors.OFF_BLACK,
  },
  'off-black-dark': {
    color: colors.WHITE,
    background: colors.OFF_BLACK_DARK,
  },
  green: {
    color: colors.WHITE,
    background: colors.GREEN,
  },
  'green-dark': {
    color: colors.WHITE,
    background: colors.DARK_GREEN,
  },
  purple: {
    color: colors.WHITE,
    background: colors.PURPLE,
  },
  'yellow-light': {
    color: colors.LIGHT_YELLOW,
    background: colors.OFF_BLACK_DARK,
  },
  'yellow-dark': {
    color: colors.DARK_YELLOW,
    background: colors.WHITE,
  },
}

const sectionSizeStyles = {
  none: { padding: 0 },
  sm: {
    padding: '3.5rem 0',
    [TABLET_BP_DOWN]: {
      padding: '2rem 0',
    },
  },
  lg: {
    padding: '7rem 0',
    [TABLET_BP_DOWN]: {
      padding: '3.5rem 0',
    },
  },
  xl: {
    padding: '14rem 0',
    [TABLET_BP_DOWN]: {
      padding: '7rem 0',
    },
  },
}

export const getColorStyles = (color: colorComponentColors) => colorMap[color]

export const getSectionSizeStyle = (sectionSize: SectionSize) =>
  sectionSizeStyles[sectionSize]

export const SectionWrapper = styled('section')(
  ({
    color = 'standard',
    size = 'lg',
    backgroundImage = 'none',
  }: {
    color?: colorComponentColors
    size?: SectionSize
    backgroundImage?: string
  }) => ({
    ...getSectionSizeStyle(size),
    ...getColorStyles(color),
    ...(backgroundImage !== 'none' && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }),
  }),
)

export const ContentWrapper = styled('div')({
  width: '100%',
  padding: '0 ' + CONTENT_GUTTER,
  margin: '0 auto',

  [MOBILE_BP_DOWN]: {
    padding: '0 ' + CONTENT_GUTTER_MOBILE,
  },

  ...CONTENT_MAX_WIDTH,
})

const ErrorBlockWrapper = styled(SectionWrapper)({
  background: 'red',
  color: 'white',
})
export const ErrorBlockComponent: React.FunctionComponent<
  { message: string } & RouteComponentProps
> = ({ message, location }) =>
  location.search.includes('_storyblok=') ? (
    <ErrorBlockWrapper>
      <ContentWrapper>
        <h1>{message}</h1>
      </ContentWrapper>
    </ErrorBlockWrapper>
  ) : null

export const ErrorBlock = withRouter(ErrorBlockComponent)
