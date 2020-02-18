import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import { BaseBlockProps } from 'blocks/BaseBlockProps'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import * as React from 'react'
import { textFlexPositionMap, TextPosition } from 'utils/textPosition'

interface HeadlineBlockProps extends BaseBlockProps {
  text: string
  text_position: TextPosition
  use_display_font: boolean
  font_size: 'xs' | 'sm' | 'md' | 'lg'
  element: 'h1' | 'h2' | 'h3' | 'h4'
  indent: boolean
}

const sizeMap = {
  xs: '1.5rem',
  sm: '2rem',
  md: '3rem',
  lg: '6rem',
}

const HeadlineContentWrapper = styled(ContentWrapper)<{ indent: boolean }>(
  ({ indent }) => ({
    maxWidth: indent ? '60rem !important' : undefined,
  }),
)

const createHeadline = (element: 'h1' | 'h2' | 'h3' | 'h4') =>
  styled(element)<{
    textPosition: TextPosition
    size: 'xs' | 'sm' | 'md' | 'lg'
    useDisplayFont: boolean
  }>(({ textPosition, size, useDisplayFont }) => ({
    display: 'flex',
    justifyContent: textFlexPositionMap[textPosition],
    fontSize: sizeMap[size],
    margin: 0,
    fontFamily: useDisplayFont ? `${fonts.EB_GARAMOND}, serif` : undefined,
    lineHeight: 1.5,
  }))

export const HeadlineBlock: React.FC<HeadlineBlockProps> = ({
  color,
  text,
  text_position,
  use_display_font,
  extra_styling,
  element,
  font_size,
  indent,
  index,
}) => {
  const Headline = createHeadline(element)

  return (
    <SectionWrapper
      color={color?.color}
      extraStyling={extra_styling}
      size="none"
    >
      <HeadlineContentWrapper indent={indent} index={index}>
        <Headline
          textPosition={text_position}
          dangerouslySetInnerHTML={{ __html: text }}
          size={font_size}
          useDisplayFont={use_display_font}
        />
      </HeadlineContentWrapper>
    </SectionWrapper>
  )
}
