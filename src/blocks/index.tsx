import * as React from 'react'
import { AboutUsHeroBlock } from './AboutUsHeroBlock'
import { AccordionBlock } from './AccordionBlock'
import { AnimatedPhoneBlock } from './AnimatedPhoneBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'
import { CardChecklistBulletPointBlock } from './CardChecklistBulletPointBlock'
import { FactsBlock } from './FactsBlock'
import { FooterBlock } from './FooterBlock'
import { HeaderBlock } from './HeaderBlock'
import { HedvigersBlock } from './HedvigersBlock'
import { IconBulletPointBlock } from './IconBulletPointBlock'
import { ImageBlock } from './ImageBlock'
import { ImageMultiTextBlock } from './ImageMultiTextBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { InvestorsBlock } from './InvestorsBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { PressBlock } from './PressBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TitleCtaBlock } from './TitleCtaBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock'

const blockComponents = {
  header_block: HeaderBlock,
  about_us_hero_block: AboutUsHeroBlock,
  accordion_block: AccordionBlock,
  bullet_point_block: BulletPointBlock,
  facts_block: FactsBlock,
  image_multi_text_block: ImageMultiTextBlock,
  investors_block: InvestorsBlock,
  hedvigers_block: HedvigersBlock,
  single_quote_block: SingleQuoteBlock,
  image_text_block: ImageTextBlock,
  image_block: ImageBlock,
  icon_bullet_point_block: IconBulletPointBlock,
  title_paragraph_block: TitleParagraphBlock,
  title_cta_block: TitleCtaBlock,
  plain_text_block: PlainTextBlock,
  press_block: PressBlock,
  spacer_block: SpacerBlock,
  footer_block: FooterBlock,
  animated_phone_block: AnimatedPhoneBlock,
  card_checklist_bullet_point_block: CardChecklistBulletPointBlock,
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
