import styled from '@emotion/styled'
import React from 'react'
import {
  ContentWrapper,
  getMinimalColorStyles,
  LAPTOP_BP_UP,
  MOBILE_BP_DOWN,
  MOBILE_BP_UP,
  SectionWrapper,
  TABLET_BP_UP,
} from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image } from '../utils/storyblok'
import {
  BaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from './BaseBlockProps'

const BulletPointSectionWrapper = styled(SectionWrapper)({
  overflowX: 'hidden',
})

const InnerWrapper = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  minWidth: '100%',

  [MOBILE_BP_DOWN]: {
    paddingLeft: '8px',
    paddingRight: '8px',
  },

  [MOBILE_BP_UP]: {
    marginLeft: '-1.5rem',
  },

  [LAPTOP_BP_UP]: {
    marginLeft: '-3.5rem',
  },
})

const BulletPoint = styled('div')<{
  alignCenter: boolean
}>(({ alignCenter }) => ({
  display: 'flex',
  flexDirection: alignCenter ? 'column' : 'row',
  alignItems: alignCenter ? 'center' : 'flex-start',
  textAlign: alignCenter ? 'center' : 'left',
  width: '100%',
  marginTop: '1.25rem',
  marginBottom: '1.25rem',

  [MOBILE_BP_UP]: {
    flexDirection: 'column',
    width: `calc(50% - 1.5rem)`,
    marginLeft: '1.5rem',
  },

  [TABLET_BP_UP]: {
    width: `calc(${(1 / 3) * 100}% - 1.5rem)`,
  },

  [LAPTOP_BP_UP]: {
    width: `calc(${(1 / 3) * 100}% - 3.5rem)`,
    marginLeft: '3.5rem',
  },
}))

const BulletPointHead = styled('div')<{
  alignCenter: boolean
}>(({ alignCenter }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  marginBottom: '1.5rem',

  ...(alignCenter
    ? {
        marginBottom: '1.5rem',
      }
    : {
        justifyContent: 'flex-start',
        maxWidth: '2rem',
        maxHeight: '2rem',
        marginRight: '1.5rem',

        [MOBILE_BP_UP]: {
          maxWidth: 'none',
          maxHeight: 'none',
          width: 'auto',
          marginRight: 0,
          marginBottom: '1.5rem',
        },
      }),
}))

const BulletPointImage = styled(DeferredImage)<{
  alignCenter: boolean
}>(({ alignCenter }) => ({
  width: alignCenter ? 'auto' : '100%',
}))

const BulletPointTitle = styled('h3')({
  marginTop: 0,
  fontSize: '1.5rem',

  [LAPTOP_BP_UP]: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
})

const BulletPointBody = styled('div')<{
  alignCenter: boolean
  colorComponent: MinimalColorComponent
}>(({ alignCenter, colorComponent }) => ({
  maxWidth: alignCenter ? '16rem' : 'none',
  color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
  fontSize: alignCenter ? '18px' : '16px',
  [LAPTOP_BP_UP]: {
    fontSize: '1.125rem',
  },
}))

interface BulletPointsBlockProps extends BaseBlockProps {
  align_center: boolean
  color_body: MinimalColorComponent
  bullet_points: ReadonlyArray<
    BaseBlockProps & {
      image: Image
      icon_layout: boolean
      title?: string
      paragraph: MarkdownHtmlComponent
    }
  >
}

export const BulletPointBlockBrandPivot: React.FunctionComponent<BulletPointsBlockProps> = ({
  align_center,
  extra_styling,
  color,
  color_body,
  size,
  bullet_points,
}) => (
  <BulletPointSectionWrapper
    brandPivot
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot>
      <InnerWrapper>
        {bullet_points.map((bullet) => (
          <BulletPoint key={bullet._uid} alignCenter={align_center}>
            <BulletPointHead alignCenter={align_center}>
              <BulletPointImage
                src={getStoryblokImage(bullet.image)}
                alignCenter={align_center}
              />
            </BulletPointHead>
            <div>
              {bullet.title && (
                <BulletPointTitle>{bullet.title}</BulletPointTitle>
              )}
              <BulletPointBody
                alignCenter={align_center}
                colorComponent={color_body}
                dangerouslySetInnerHTML={{
                  __html: bullet.paragraph?.html,
                }}
              />
            </div>
          </BulletPoint>
        ))}
      </InnerWrapper>
    </ContentWrapper>
  </BulletPointSectionWrapper>
)
