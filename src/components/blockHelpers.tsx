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
  purple: {
    color: colors.WHITE,
    background: colors.PURPLE,
  },
}

const sectionSizeStyles = {
  sm: {
    padding: '3.5rem 0',
  },
  lg: {
    padding: '7rem 0',
  },
  xl: {
    padding: '14rem 0',
    [TABLET_BP_DOWN]: {
      padding: '7rem 0',
    },
  },
}

const getColorStyles = (color?: colorComponentColors) =>
  colorMap[color || 'standard'] || colorMap.standard

const getSectionSizeStyle = (sectionSize: SectionSize) => {
  return sectionSizeStyles[sectionSize]
}

export const SectionWrapper = styled('section')(
  ({
    color,
    size = 'lg',
  }: {
    color?: colorComponentColors
    size?: SectionSize
  }) => ({
    ...getSectionSizeStyle(size),
    ...getColorStyles(color),
  }),
)

export const ContentWrapper = styled('div')({
  width: '100%',
  maxWidth: 1200,
  padding: '0 ' + CONTENT_GUTTER,
  margin: '0 auto',

  [MOBILE_BP_DOWN]: {
    padding: '0 ' + CONTENT_GUTTER_MOBILE,
  },
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
