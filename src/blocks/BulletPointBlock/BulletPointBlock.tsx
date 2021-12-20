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

const BulletPoint = styled.div<{
  alignCenter: boolean
}>`
  display: flex;
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;

  ${(props) =>
    props.alignCenter &&
    `
      flex-direction: column;
      align-items: center;
      text-align: center;
    `}

  ${MOBILE_BP_UP} {
    flex-direction: column;
    width: calc(50% - 1.5rem);
    margin-left: 1.5rem;
  }

  ${TABLET_BP_UP} {
    width: calc((1 / 3 * 100%) - 1.5rem);
  }

  ${LAPTOP_BP_UP} {
    width: calc((1 / 3 * 100%) - 3.5rem);
    margin-left: 3.5rem;
  }
`

const BulletPointHead = styled.div<{
  alignCenter: boolean
}>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 1.5rem;

  ${(props) =>
    props.alignCenter
      ? `
        margin-bottom: 1.5rem;
      `
      : `
        justify-content: flex-start;
        max-width: 2rem;
        max-height: 2rem;
        margin-right: 1.5rem;

        ${MOBILE_BP_UP} {
          max-width: none;
          max-height: none;
          width: auto;
          margin-right: 0;
          margin-bottom: 2rem;
        }
      `}
`

const BulletPointImage = styled(DeferredImage)<{
  alignCenter: boolean
}>`
  width: auto;
`

const BulletPointContent = styled.div``

const BulletPointTitle = styled.h3`
  margin-top: 0;
  font-size: 1.5rem;

  ${LAPTOP_BP_UP} {
    margin-bottom: 2rem;
    font-size: 2rem;
  }
`

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

  ${LAPTOP_BP_UP} {
    font-size: 1.125rem;
  }
`

export type BulletPointItemProps = ReadonlyArray<
  BrandPivotBaseBlockProps & {
    image: Image
    title?: string
    paragraph: MarkdownHtmlComponent
  }
>

export type BulletPointBlockProps = BrandPivotBaseBlockProps & {
  align_center: boolean
  color_body: MinimalColorComponent
  bullet_points: BulletPointItemProps
}

export const BulletPointBlock: React.FC<BulletPointBlockProps> = ({
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
            {bullet.image && (
              <BulletPointHead alignCenter={align_center}>
                <BulletPointImage
                  src={getStoryblokImage(bullet.image)}
                  alignCenter={align_center}
                />
              </BulletPointHead>
            )}
            <BulletPointContent>
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
            </BulletPointContent>
          </BulletPoint>
        ))}
      </InnerWrapper>
    </ContentWrapper>
  </BulletPointSectionWrapper>
)
