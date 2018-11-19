import * as React from 'react'
import { AccordionBlock } from './AccordionBlock'
import { BaseBlockProps } from './BaseBlockProps'

const blockComponents = {
  accordion_block: AccordionBlock,
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
