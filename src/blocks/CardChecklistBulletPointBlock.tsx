import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { textFlexPositionMap, TextPosition } from '../utils/textPosition'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const GUTTER = '2rem'

const BulletPointSectionWrapper = styled(SectionWrapper)({
  overflowX: 'hidden',
})

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
  background: colors.WHITE,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.2)',
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
})

const BulletPointImage = styled('img')({
  width: '100%',
})

const BulletPointBody = styled('div')({
  padding: '0 1.414rem 1.414rem 1.414rem',
  wordBreak: 'break-word',
})

const BulletPointTitle = styled('h3')({
  fontSize: '1.25rem',
})

const BulletPointParagraph = styled('div')({
  display: '-webkit-box',
  lineClamp: 3,
  boxOrient: 'vertical',
})

const BulletPointChecklist = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
})

const BulletPointChecklistItem = styled('li')({
  display: 'flex',
  width: 'calc(50% - 0.25rem)',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  alignItems: 'center',
  ':nth-child(odd)': {
    marginRight: '0.5rem',
  },
})

const CheckIcon = styled('div')({
  display: 'inline-block',
  padding: '0.25rem',
  color: colors.WHITE,
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '50%',
  backgroundColor: '#1BE9B6',
  marginRight: '0.5rem',
  img: {
    display: 'block',
    width: '10px',
  },
})

interface Check {
  title: string
}

interface BulletPointsBlockProps extends BaseBlockProps {
  bullet_points_position: TextPosition
  bullet_points: ReadonlyArray<
    BaseBlockProps & {
      image: Image
      title: string
      paragraph: MarkdownHtmlComponent
      check_list: ReadonlyArray<Check>
    }
  >
}

export const CardChecklistBulletPointBlock: React.FunctionComponent<
  BulletPointsBlockProps
> = ({ color, bullet_points_position, bullet_points }) => (
  <BulletPointSectionWrapper color={color && color.color}>
    <ContentWrapper>
      <BulletPointsWrapper position={bullet_points_position}>
        {bullet_points.map((bullet) => (
          <BulletPoint key={bullet._uid}>
            <BulletPointHead>
              <BulletPointImage src={getStoryblokImage(bullet.image)} />
            </BulletPointHead>
            <BulletPointBody>
              <BulletPointTitle>{bullet.title}</BulletPointTitle>
              <BulletPointParagraph
                dangerouslySetInnerHTML={{
                  __html: bullet.paragraph && bullet.paragraph.html,
                }}
              />
              <div>
                <BulletPointChecklist>
                  {bullet.check_list.map((check) => {
                    return (
                      <BulletPointChecklistItem>
                        <CheckIcon>
                          <img src="/assets-next/tick.svg" />
                        </CheckIcon>
                        {check.title}
                      </BulletPointChecklistItem>
                    )
                  })}
                </BulletPointChecklist>
              </div>
            </BulletPointBody>
          </BulletPoint>
        ))}
      </BulletPointsWrapper>
    </ContentWrapper>
  </BulletPointSectionWrapper>
)
