import * as React from 'react'
import { BaseBlockProps } from './BaseBlockProps'
import { CallToActionSection } from './CallToActionSection'
import { ImageTextSection } from './ImageTextSection'
import { SingleQuoteSection } from './SingleQuoteBlock'
import { TitleParagraphSection } from './TitleParagraphSection'
import { TextSection } from './TextSection'

const blockComponents = {
  SingleQuoteSection,
  TitleParagraphSection,
  CallToActionSection,
  ImageTextSection,
  TextSection,
}

export const getBlockComponent = <
  TBlockType extends keyof typeof blockComponents
>(
  blockType: string | TBlockType,
):
  | (typeof blockComponents)[TBlockType]
  | React.ComponentType<BaseBlockProps>
  | undefined => {
  return blockComponents[blockType as keyof typeof blockComponents]
}
