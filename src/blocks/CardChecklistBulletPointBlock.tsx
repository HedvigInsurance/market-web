import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { textFlexPositionMap, TextPosition } from '../utils/textPosition'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

const GUTTER = '2rem'

const BulletPointSectionWrapper = styled(SectionWrapper)({
  overflowX: 'hidden',
})

const Title = styled('h2')(({ position }: { position: TextPosition }) => ({
  display: 'flex',
  justifyContent: textFlexPositionMap[position],
  flexWrap: 'wrap',
  minWidth: '100%',
  marginTop: 0,
  marginBottom: '2rem',
  [MOBILE_BP_DOWN]: {
    justifyContent: textFlexPositionMap.left,
  },
}))

const BulletPointsWrapper = styled('div')(
  ({ position }: { position: TextPosition }) => ({
    display: 'flex',
    justifyContent: textFlexPositionMap[position],
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
    width: '100%',
    marginLeft: 0,
    marginRight: 0,
  },
})

const BulletPointHead = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const BulletPointImage = styled(DeferredImage)({
  width: '100%',
})

const BulletPointBody = styled('div')({
  padding: '0 1.414rem 1.414rem 1.414rem',
  wordBreak: 'break-word',
})

const BulletPointTitle = styled('h3')({
  fontSize: '1.25rem',
})

const BulletPointParagraph = styled('div')()

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
  display: 'flex',
  padding: '0.4rem',
  color: colors.WHITE,
  textAlign: 'center',
  verticalAlign: 'middle',
  borderRadius: '50%',
  backgroundColor: colors.GREEN,
  marginRight: '0.5rem',
  boxSizing: 'border-box',
})

const Svg = styled('svg')({
  width: 12,
  height: 12,
})

const CheckIconSvg = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path
      d="M504.502 75.496c-9.997-9.998-26.205-9.998-36.204 0L161.594 382.203 43.702 264.311c-9.997-9.998-26.205-9.997-36.204 0-9.998 9.997-9.998 26.205 0 36.203l135.994 135.992c9.994 9.997 26.214 9.99 36.204 0L504.502 111.7c9.998-9.997 9.997-26.206 0-36.204z"
      fill="#FFF"
    />
  </Svg>
)

interface Check {
  _uid: string
  title: string
}

interface BulletPointsBlockProps extends BaseBlockProps {
  title?: string
  title_position: TextPosition
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
> = ({
  color,
  title,
  title_position,
  bullet_points_position,
  bullet_points,
  size,
}) => (
  <BulletPointSectionWrapper color={color && color.color} size={size}>
    <ContentWrapper>
      {title && <Title position={title_position}>{title}</Title>}
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
                      <BulletPointChecklistItem key={check._uid}>
                        <CheckIcon>
                          <CheckIconSvg />
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
