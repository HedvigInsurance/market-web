import { BaseBlockProps } from './BaseBlockProps'
import { SingleQuoteSection } from './SingleQuoteBlock'
import { TitleParagraphSection } from './TitleParagraphSection'

const blockComponents = {
  SingleQuoteSection,
  TitleParagraphSection,
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
