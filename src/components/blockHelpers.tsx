import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import * as React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { SectionSize } from 'src/utils/SectionSize'
import { minimalColorComponentColors } from '../blocks/BaseBlockProps'

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

interface ColorSet {
  color: string
  background: string
}

const sectionSizeStyles = {
  none: { padding: 0 },
  xs: {
    padding: '0.5rem 0',
    [TABLET_BP_DOWN]: {
      padding: '0.25rem 0',
    },
  },
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

export const getColorStyles = (
  color: minimalColorComponentColors,
  standardColor: string = colorsV3.white,
  standardInverseColor: string = colorsV3.black,
): ColorSet => {
  if (color === 'standard') {
    return { background: standardColor, color: standardInverseColor }
  }

  if (color === 'standard-inverse') {
    return { background: standardInverseColor, color: colorsV3.white }
  }

  return { background: standardColor, color: standardInverseColor }
}

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
  color?: minimalColorComponentColors
  size?: SectionSize
  backgroundImage?: string
  extraStyling?: string
}
const SectionWrapperComponentUnstyled = styled('section')<SectionProps>(
  ({ color = 'standard', size = 'lg' }) => ({
    position: 'relative',
    transition: 'background 300ms',
    ...getSectionSizeStyle(size),
    color: getColorStyles(color, 'transparent').color,
  }),
)
export const SectionWrapperComponent = styled(SectionWrapperComponentUnstyled)<
  SectionProps
>`
  ${({ extraStyling }) => String(extraStyling)}
`
const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})
const SectionBackground = styled('div')<{
  backgroundImage?: string
  color?: minimalColorComponentColors
}>(({ backgroundImage, color = 'standard' }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  minHeight: '100%',
  minWidth: '100%',
  opacity: 0,
  animation: fadeIn + ' 500ms forwards',
  animationDelay: '1000ms',
  backgroundColor: getColorStyles(color, 'transparent').background,
  ...backgroundImageStyles(backgroundImage || 'none'),
  zIndex: -1,
}))

export const SectionWrapper: React.FC<SectionProps> = ({
  children,
  backgroundImage,
  ...props
}) => (
  <SectionWrapperComponent {...props}>
    <SectionBackground backgroundImage={backgroundImage} color={props.color} />
    {children}
  </SectionWrapperComponent>
)

export const MarginSectionWrapper = styled('section')<SectionProps>(
  ({ color = 'standard', size = 'lg', backgroundImage = 'none' }) => ({
    ...getSectionSizeStyle(size),
    ...getColorStyles(color, 'transparent'),
    ...backgroundImageStyles(backgroundImage),
  }),
)

export const ContentWrapper = styled('div')<{ indent: boolean }>(
  ({ indent }) => ({
    width: '100%',
    padding: '0 ' + CONTENT_GUTTER,
    margin: '0 auto',

    [MOBILE_BP_DOWN]: {
      padding: '0 ' + CONTENT_GUTTER_MOBILE,
    },

    ...CONTENT_MAX_WIDTH,

    ...(indent ? { maxWidth: '60rem' } : {}),
  }),
)

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
