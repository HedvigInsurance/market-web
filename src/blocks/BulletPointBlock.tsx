import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { textFlexPositionMap, TextPosition } from '../utils/textPosition'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 800px)'
const GUTTER = '2rem'

const BulletPointsWrapper = styled('div')(
  ({ position }: { position: TextPosition }) => ({
    display: 'flex',
    justifyContent: textFlexPositionMap[position],
    margin: `-${GUTTER}`,
    flexWrap: 'wrap',
    minWidth: '100%',
  }),
)

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

const BulletPointHead = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '16rem',
})
const BulletPointImage = styled('img')({
  width: `calc(100% - ${GUTTER})`,
  margin: 'auto',
  maxWidth: '16rem',
  maxHeight: '16rem',
})

const BulletPointBody = styled('div')({})

const BulletPointTitle = styled('h3')({
  fontSize: '1.25rem',
})

interface BulletPointsBlockProps extends BaseBlockProps {
  bullet_points_position: TextPosition
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
> = ({ color, bullet_points_position, bullet_points }) => (
  <SectionWrapper color={color && color.color}>
    <ContentWrapper>
      <BulletPointsWrapper position={bullet_points_position}>
        {bullet_points.map((bullet) => (
          <BulletPoint key={bullet._uid}>
            <BulletPointHead>
              <BulletPointImage src={getStoryblokImage(bullet.image)} />
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
      </BulletPointsWrapper>
    </ContentWrapper>
  </SectionWrapper>
)
