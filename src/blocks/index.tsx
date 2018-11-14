import * as React from 'react'
import { AccordionBlock } from './AccordionBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { CallToActionSection } from './CallToActionSection'
import { SingleQuoteSection } from './SingleQuoteBlock'
import { TitleParagraphSection } from './TitleParagraphSection'

const blockComponents = {
  SingleQuoteSection,
  TitleParagraphSection,
  CallToActionSection,
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
