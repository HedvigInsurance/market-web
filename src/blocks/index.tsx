import * as React from 'react'
import { AboutUsHeroBlock } from './AboutUsHeroBlock'
import { AccordionBlock } from './AccordionBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'
import { FooterBlock } from './FooterBlock'
import { HeaderBlock } from './HeaderBlock'
import { IconBulletPointBlock } from './IconBulletPointBlock'
import { ImageMultiTextBlock } from './ImageMultiTextBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TitleCtaBlock } from './TitleCtaBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock'

const blockComponents = {
  header_block: HeaderBlock,
  about_us_hero_block: AboutUsHeroBlock,
  accordion_block: AccordionBlock,
  bullet_point_block: BulletPointBlock,
  image_multi_text_block: ImageMultiTextBlock,
  single_quote_block: SingleQuoteBlock,
  image_text_block: ImageTextBlock,
  icon_bullet_point_block: IconBulletPointBlock,
  title_paragraph_block: TitleParagraphBlock,
  title_cta_block: TitleCtaBlock,
  plain_text_block: PlainTextBlock,
  spacer_block: SpacerBlock,
  footer_block: FooterBlock,
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
