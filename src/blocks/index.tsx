import * as React from 'react'
import { AboutUsHeroBlock } from './AboutUsHeroBlock'
import { AccordionBlock } from './AccordionBlock'
import { AnimatedCtaBlock } from './AnimatedCtaBlock'
import { AnimatedPhoneBlock } from './AnimatedPhoneBlock'
import { BackgroundVideoBlock } from './BackgroundVideoBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'
import { CardChecklistBulletPointBlock } from './CardChecklistBulletPointBlock'
import { DownloadBlock } from './DownloadBlock'
import { FactsBlock } from './FactsBlock'
import { FooterBlock } from './FooterBlock'
import { HeaderBlock } from './HeaderBlock'
import { HedvigersBlock } from './HedvigersBlock'
import { HeroVideoBlock } from './HeroVideoBlock'
import { IconBulletPointBlock } from './IconBulletPointBlock'
import { IconForestBlock } from './IconForestBlock'
import { ImageBlock } from './ImageBlock'
import { ImageMultiTextBlock } from './ImageMultiTextBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { TitleTextCtaBlock } from './TitleTextCtaBlock'
import { InvestorsBlock } from './InvestorsBlock'
import { MediaLogosBlock } from './MediaLogosBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { PressBlock } from './PressBlock'
import { PressCardBlock } from './PressCardBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { SwitcherBlock } from './SwitcherBlock'
import { TitleCtaBlock } from './TitleCtaBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock'

const blockComponents = {
  header_block: HeaderBlock,
  about_us_hero_block: AboutUsHeroBlock,
  accordion_block: AccordionBlock,
  bullet_point_block: BulletPointBlock,
  download_block: DownloadBlock,
  facts_block: FactsBlock,
  image_multi_text_block: ImageMultiTextBlock,
  investors_block: InvestorsBlock,
  hedvigers_block: HedvigersBlock,
  hero_video_block: HeroVideoBlock,
  single_quote_block: SingleQuoteBlock,
  image_text_block: ImageTextBlock,
  title_text_cta_block: TitleTextCtaBlock,
  image_block: ImageBlock,
  media_logos_block: MediaLogosBlock,
  icon_bullet_point_block: IconBulletPointBlock,
  switcher_block: SwitcherBlock,
  title_paragraph_block: TitleParagraphBlock,
  title_cta_block: TitleCtaBlock,
  background_video_block: BackgroundVideoBlock,
  plain_text_block: PlainTextBlock,
  press_block: PressBlock,
  spacer_block: SpacerBlock,
  footer_block: FooterBlock,
  animated_phone_block: AnimatedPhoneBlock,
  card_checklist_bullet_point_block: CardChecklistBulletPointBlock,
  animated_cta_block: AnimatedCtaBlock,
  icon_forest_block: IconForestBlock,
  press_card_block: PressCardBlock,
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
