import styled from '@emotion/styled'
import * as React from 'react'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  MOBILE_BP_UP,
  TABLET_BP_UP,
  LAPTOP_BP_UP,
  SectionWrapper,
} from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'
import { colorsV3 } from '@hedviginsurance/brand'

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
    marginLeft: '-40px',
  },

  [LAPTOP_BP_UP]: {
    marginLeft: '-80px',
  },
})

const BulletPoint = styled('div')<{
  iconLayout: boolean
}>(({ iconLayout }) => ({
  display: 'flex',
  flexDirection: iconLayout ? 'row' : 'column',
  alignItems: 'flex-start',
  width: `calc(100% - 40px)`,
  marginTop: '1.25rem',
  marginBottom: '1.25rem',

  [MOBILE_BP_UP]: {
    flexDirection: 'column',
    width: `calc(50% - 40px)`,
    marginLeft: '40px',
  },

  [TABLET_BP_UP]: {
    width: `calc(${(1 / 3) * 100}% - 40px)`,
  },

  [LAPTOP_BP_UP]: {
    width: `calc(${(1 / 3) * 100}% - 80px)`,
    marginLeft: '80px',
  },
}))

const BulletPointHead = styled('div')<{
  iconLayout: boolean
}>(({ iconLayout }) => ({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,

  ...(iconLayout
    ? {
        justifyContent: 'flex-start',
        maxWidth: '32px',
        maxHeight: '32px',
        marginRight: '24px',
      }
    : {
        marginBottom: '24px',
      }),

  [MOBILE_BP_UP]: {
    maxWidth: 'none',
    maxHeight: 'none',
    width: 'auto',
    marginRight: 0,
    marginBottom: '24px',
  },
}))

const BulletPointImage = styled(DeferredImage)<{
  iconLayout: boolean
}>(({ iconLayout }) => ({
  width: iconLayout ? 'auto' : '100%',
}))

const BulletPointTitle = styled('h3')({
  marginTop: 0,
  fontSize: '1.5rem',

  [LAPTOP_BP_UP]: {
    fontSize: '2rem',
    marginBottom: '32px',
  },
})

const BulletPointBody = styled('div')({
  [LAPTOP_BP_UP]: {
    fontSize: '1.125rem',
    color: colorsV3.gray700,
  },
})

interface BulletPointsBlockProps extends BaseBlockProps {
  bullet_points: ReadonlyArray<
    BaseBlockProps & {
      image: Image
      icon_layout: boolean
      title: string
      paragraph: MarkdownHtmlComponent
    }
  >
}

export const BulletPointBlockBrandPivot: React.FunctionComponent<BulletPointsBlockProps> = ({
  extra_styling,
  color,
  size,
  bullet_points,
}) => (
  <BulletPointSectionWrapper
    brandPivot
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper>
      <InnerWrapper>
        {bullet_points.map((bullet) => (
          <BulletPoint key={bullet._uid} iconLayout={bullet.icon_layout}>
            <BulletPointHead iconLayout={bullet.icon_layout}>
              <BulletPointImage
                src={getStoryblokImage(bullet.image)}
                iconLayout={bullet.icon_layout}
              />
            </BulletPointHead>
            <div>
              <BulletPointTitle>{bullet.title}</BulletPointTitle>
              <BulletPointBody
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
