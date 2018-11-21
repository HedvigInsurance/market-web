import * as React from 'react'
import { AccordionBlock } from './AccordionBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { HeaderBlock } from './HeaderBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'

const blockComponents = {
  accordion_block: AccordionBlock,
  header_block: HeaderBlock,
  single_quote_block: SingleQuoteBlock,
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
