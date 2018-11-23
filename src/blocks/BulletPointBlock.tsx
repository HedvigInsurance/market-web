import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
} from '../components/blockHelpers'
import { textFlexPositionMap, TextPosition } from '../utils/textPosition'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const TABLET_BP_DOWN = '@media (max-width: 800px)'
const GUTTER = '1rem'

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
  margin: '1rem',
  width: `calc(${(1 / 3) * 100}% - ${GUTTER}*2)`,

  [TABLET_BP_DOWN]: {
    width: `calc(50% - ${GUTTER}*2)`,
  },

  [MOBILE_BP_DOWN]: {
    width: `calc(100% - ${GUTTER}*2)`,
  },
})
const BulletPointTitle = styled('h3')({
  fontSize: '1.25rem',
})

interface BulletPointsBlockProps extends BaseBlockProps {
  bullet_points_position: TextPosition
  bullet_points: ReadonlyArray<
    BaseBlockProps & {
      image: string
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
            <img src={bullet.image} />
            <BulletPointTitle>{bullet.title}</BulletPointTitle>
            <div
              dangerouslySetInnerHTML={{
                __html: bullet.paragraph && bullet.paragraph.html,
              }}
            />
          </BulletPoint>
        ))}
      </BulletPointsWrapper>
    </ContentWrapper>
  </SectionWrapper>
)
