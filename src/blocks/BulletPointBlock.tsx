import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { textFlexPositionMap, TextPosition } from '../utils/textPosition'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 800px)'
const GUTTER = '2rem'

const BulletPointSectionWrapper = styled(SectionWrapper)({
  overflowX: 'hidden',
})

const InnerWrapper = styled('div')(
  ({ position }: { position: TextPosition }) => ({
    display: 'flex',
    justifyContent: textFlexPositionMap[position],
    margin: `-${GUTTER}`,
    flexWrap: 'wrap',
    minWidth: '100%',
  }),
)
const Title = styled('h2')(({ position }: { position: TextPosition }) => ({
  display: 'flex',
  justifyContent: textFlexPositionMap[position],
  minWidth: '100%',
}))

const BulletPoint = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  margin: GUTTER,
  width: `calc(${(1 / 3) * 100}% - ${GUTTER}*2)`,

  [TABLET_BP_DOWN]: {
    width: `calc(50% - ${GUTTER}*2)`,
  },

  [MOBILE_BP_DOWN]: {
    width: `calc(100% - ${GUTTER}*2)`,
  },
})

const BulletPointHead = styled('div')(
  ({ forceSize }: { forceSize: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: forceSize ? '16rem' : undefined,
  }),
)
const BulletPointImage = styled(DeferredImage)(
  ({ forceSize }: { forceSize: boolean }) => ({
    margin: 'auto',
    ...(forceSize
      ? {
          width: `calc(100% - ${GUTTER})`,
          maxWidth: '16rem',
          maxHeight: '16rem',
        }
      : {
          width: '100%',
        }),
  }),
)

const BulletPointBody = styled('div')({})

const BulletPointTitle = styled('h3')({
  fontSize: '1.25rem',
})

interface BulletPointsBlockProps extends BaseBlockProps {
  title?: string
  title_position: TextPosition
  bullet_points_position: TextPosition
  enforce_size: boolean
  bullet_points: ReadonlyArray<
    BaseBlockProps & {
      image: Image
      title: string
      paragraph: MarkdownHtmlComponent
    }
  >
}

export const BulletPointBlock: React.FunctionComponent<
  BulletPointsBlockProps
> = ({ color, title_position, title, enforce_size, bullet_points_position, bullet_points }) => (
  <BulletPointSectionWrapper color={color && color.color}>
    <ContentWrapper>
      {title && <Title position={title_position}>{title}</Title>}
      <InnerWrapper position={bullet_points_position}>
        {bullet_points.map((bullet) => (
          <BulletPoint key={bullet._uid}>
            <BulletPointHead forceSize={enforce_size}>
              <BulletPointImage
                src={getStoryblokImage(bullet.image)}
                forceSize={enforce_size}
              />
            </BulletPointHead>
            <BulletPointBody>
              <BulletPointTitle>{bullet.title}</BulletPointTitle>
              <div
                dangerouslySetInnerHTML={{
                  __html: bullet.paragraph && bullet.paragraph.html,
                }}
              />
            </BulletPointBody>
          </BulletPoint>
        ))}
      </InnerWrapper>
    </ContentWrapper>
  </BulletPointSectionWrapper>
)
