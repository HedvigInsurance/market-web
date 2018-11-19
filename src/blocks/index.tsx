import * as React from 'react'
import { BaseBlockProps } from './BaseBlockProps'
import { ImageTextBlock } from './ImageTextBlock'
import { TitleCtaBlock } from './TitleCtaBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock'

const blockComponents = {
  title_cta_block: TitleCtaBlock,
  image_text_block: ImageTextBlock,
  title_paragraph_block: TitleParagraphBlock,
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
