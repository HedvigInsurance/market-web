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
} from 'components/blockHelpers'
import { DeferredImage } from 'components/DeferredImage'
import { getStoryblokImage, Image } from 'utils/storyblok'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
  MinimalColorComponent,
} from 'blocks/BaseBlockProps'
import { FontSizes, Heading } from 'components/Heading/Heading'

const BulletPointSectionWrapper = styled(SectionWrapper)`
  overflow-x: hidden;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 100%;

  ${MOBILE_BP_DOWN} {
    padding-left: 8px;
    padding-right: 8px;
  }

  ${MOBILE_BP_UP} {
    margin-left: -1.5rem;
  }

  ${LAPTOP_BP_UP} {
    margin-left: -3.5rem;
  }
`

const BulletPointTitle = styled(Heading)`
  margin-bottom: 1rem;
`

const BulletPoint = styled.div<{
  alignCenter: boolean
  bulletPointLayout: boolean
  columns: number
}>`
  display: flex;
  flex-direction: ${(props) => (props.bulletPointLayout ? 'row' : 'column')};
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;

  ${(props) =>
    props.alignCenter &&
    `
      align-items: center;
      text-align: center;
    `}

  ${MOBILE_BP_UP} {
    flex-direction: column;
    width: calc(50% - 1.5rem);
    margin-left: 1.5rem;
  }

  ${TABLET_BP_UP} {
    ${(props) =>
      props.columns === 3 &&
      `
        width: calc((1 / 3 * 100%) - 1.5rem)
      `}
  }

  ${LAPTOP_BP_UP} {
    width: ${(props) => `calc((1 / ${props.columns} * 100%) - 3.5rem)`};
    margin-left: 3.5rem;
  }
`

const BulletPointHeader = styled.div<{
  alignCenter: boolean
  bulletPointLayout: boolean
}>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 1.5rem;

  ${(props) =>
    props.bulletPointLayout &&
    `
        justify-content: flex-start;
        max-width: 2rem;
        max-height: 2rem;
        margin-right: 1.5rem;

        ${MOBILE_BP_UP} {
          max-width: none;
          max-height: none;
          width: auto;
          margin-right: 0;
        }
      `}
`

const BulletPointImage = styled(DeferredImage)`
  width: auto;
`

const BulletPointContent = styled.div``

const BulletPointBody = styled.div<{
  alignCenter: boolean
  colorComponent: MinimalColorComponent
}>`
  max-width: ${(props) => (props.alignCenter ? '16rem' : 'none')};
  margin-left: auto;
  margin-right: auto;
  color: ${(props) =>
    getMinimalColorStyles(props.colorComponent?.color ?? 'standard').color};
  font-size: 1rem;

  & > * {
    margin: 0 auto 1rem;
  }

  ${LAPTOP_BP_UP} {
    font-size: 1.125rem;
  }
`

export type BulletPointItemProps = ReadonlyArray<
  BrandPivotBaseBlockProps & {
    image: Image
    title?: string
    title_size: FontSizes
    title_size_mobile?: FontSizes
    paragraph: MarkdownHtmlComponent
  }
>

export type BulletPointBlockProps = BrandPivotBaseBlockProps & {
  align_center: boolean
  bullet_point_layout: boolean
  color_body: MinimalColorComponent
  bullet_points: BulletPointItemProps
}

export const BulletPointBlock = ({
  align_center,
  bullet_point_layout,
  extra_styling,
  color,
  color_body,
  size,
  bullet_points,
}: BulletPointBlockProps) => (
  <BulletPointSectionWrapper
    brandPivot
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper fullWidth>
      <InnerWrapper>
        {bullet_points.map((bullet) => (
          <BulletPoint
            key={bullet._uid}
            alignCenter={align_center}
            bulletPointLayout={bullet_point_layout}
            columns={bullet_points.length}
          >
            {bullet.image && (
              <BulletPointHeader
                alignCenter={align_center}
                bulletPointLayout={bullet_point_layout}
              >
                <BulletPointImage src={getStoryblokImage(bullet.image)} />
              </BulletPointHeader>
            )}
            <BulletPointContent>
              {bullet.title && (
                <BulletPointTitle
                  as="h3"
                  size={bullet.title_size}
                  mobileSize={bullet.title_size_mobile}
                >
                  {bullet.title}
                </BulletPointTitle>
              )}
              {bullet.paragraph && (
                <BulletPointBody
                  alignCenter={align_center}
                  colorComponent={color_body}
                  dangerouslySetInnerHTML={{
                    __html: bullet.paragraph?.html,
                  }}
                />
              )}
            </BulletPointContent>
          </BulletPoint>
        ))}
      </InnerWrapper>
    </ContentWrapper>
  </BulletPointSectionWrapper>
)
