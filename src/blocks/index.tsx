import { BaseBlock } from './BaseBlock'
import { SingleQuoteSection } from './SingleQuoteBlock'

const blockComponents = {
  SingleQuoteSection,
}

export const getBlockComponent = <
  TBlockType extends keyof typeof blockComponents
>(
  blockType: string | TBlockType,
):
  | (typeof blockComponents)[TBlockType]
  | React.ComponentType<BaseBlock>
  | undefined => {
  return blockComponents[blockType as keyof typeof blockComponents]
}
