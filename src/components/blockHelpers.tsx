import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { SectionSize } from 'src/utils/SectionSize'
import { colorComponentColors } from '../blocks/BaseBlockProps'

export const CONTENT_GUTTER = '2rem'
export const CONTENT_GUTTER_MOBILE = '1rem'
export const MOBILE_BP_UP = '@media (min-width: 481px)'
export const MOBILE_BP_DOWN = '@media (max-width: 480px)'
export const TABLET_BP_DOWN = '@media (max-width: 840px)'
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
    color: colors.OFF_BLACK_DARK,
    background: colors.LIGHT_YELLOW,
  },
  'yellow-dark': {
    color: colors.WHITE,
    background: colors.DARK_YELLOW,
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

export const getSectionSizeStyle = (size: SectionSize) =>
  sectionSizeStyles[size]

export const backgroundImageStyles = (backgroundImage: string) => {
  return (
    backgroundImage !== 'none' &&
    backgroundImage !== '' && {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }
  )
}

interface SectionProps {
  color?: colorComponentColors
  size?: SectionSize
  backgroundImage?: string
}
export const SectionWrapperComponent = styled('section')<SectionProps>(
  ({ color = 'standard', size = 'lg' }) => ({
    position: 'relative',
    transition: 'background 300ms',
    ...getSectionSizeStyle(size),
    ...getColorStyles(color),
  }),
)
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})
const SectionBackground = styled('div')<{ backgroundImage?: string }>(
  ({ backgroundImage }) => ({
    position: 'absolute',
    top: 0,
    bottom: 0,
    minHeight: '100%',
    minWidth: '100%',
    opacity: 0,
    animation: fadeIn + ' 500ms forwards',
    animationDelay: '1000ms',
    ...backgroundImageStyles(backgroundImage || 'none'),
  }),
)

export const SectionWrapper: React.FC<SectionProps> = ({
  children,
  backgroundImage,
  ...props
}) => (
  <SectionWrapperComponent {...props}>
    <SectionBackground backgroundImage={backgroundImage} />
    {children}
  </SectionWrapperComponent>
)

export const MarginSectionWrapper = styled('section')<SectionProps>(
  ({ color = 'standard', size = 'lg', backgroundImage = 'none' }) => ({
    ...getSectionSizeStyle(size),
    ...getColorStyles(color),
    ...backgroundImageStyles(backgroundImage),
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
export const ErrorBlockComponent: React.FunctionComponent<{
  message: string
} & RouteComponentProps> = ({ message, location }) =>
  location.search.includes('_storyblok=') ? (
    <ErrorBlockWrapper>
      <ContentWrapper>
        <h1>{message}</h1>
      </ContentWrapper>
    </ErrorBlockWrapper>
  ) : null

export const ErrorBlock = withRouter(ErrorBlockComponent)
