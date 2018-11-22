import * as React from 'react'
import { AccordionBlock } from './AccordionBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'
import { HeaderBlock } from './HeaderBlock'
import { ImageMultiTextBlock } from './ImageMultiTextBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'

const blockComponents = {
  accordion_block: AccordionBlock,
  header_block: HeaderBlock,
  bullet_point_block: BulletPointBlock,
  image_multi_text_block: ImageMultiTextBlock,
  single_quote_block: SingleQuoteBlock,
  image_text_block: ImageTextBlock,
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
