import styled from '@emotion/styled'
import * as React from 'react'
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
    marginLeft: '-40px',
  },

  [LAPTOP_BP_UP]: {
    marginLeft: '-80px',
  },
})

const BulletPoint = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: `calc(100% - 40px)`,
  marginTop: '1.25rem',
  marginBottom: '1.25rem',

  [MOBILE_BP_UP]: {
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
})

const BulletPointHead = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  marginBottom: '24px',

  [MOBILE_BP_UP]: {
    maxWidth: 'none',
    maxHeight: 'none',
    width: 'auto',
    marginRight: 0,
    marginBottom: '24px',
  },
})

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
    marginBottom: '2rem',
  },
})

const BulletPointBody = styled('div')<{
  colorComponent: MinimalColorComponent
}>(({ colorComponent }) => ({
  color: getMinimalColorStyles(colorComponent?.color ?? 'standard').color,
}))

interface BulletPointsBlockProps extends BaseBlockProps {
  color_body: MinimalColorComponent
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
    <ContentWrapper>
      <InnerWrapper>
        {bullet_points.map((bullet) => (
          <BulletPoint key={bullet._uid}>
            <BulletPointHead>
              <BulletPointImage
                src={getStoryblokImage(bullet.image)}
                iconLayout={bullet.icon_layout}
              />
            </BulletPointHead>
            <div>
              <BulletPointTitle>{bullet.title}</BulletPointTitle>
              <BulletPointBody
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
