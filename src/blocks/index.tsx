import { LabelBlock } from 'blocks/LabelBlock'
import * as React from 'react'
import { AboutUsHeroBlock } from './AboutUsHeroBlock'
import { AccordionBlock } from './AccordionBlock'
import { BackgroundVideoBlock } from './BackgroundVideoBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'
import { CardChecklistBulletPointBlock } from './CardChecklistBulletPointBlock'
import { DownloadBlock } from './DownloadBlock'
import { FooterBlock } from './FooterBlock'
import { HeaderBlock } from './HeaderBlock'
import { HeroVideoBlock } from './HeroVideoBlock'
import { HomeHeroBlock } from './HomeHeroBlock'
import { IconBulletPointBlock } from './IconBulletPointBlock'
import { ImageBlock } from './ImageBlock'
import { ImageMultiTextBlock } from './ImageMultiTextBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { InvestorsBlock } from './InvestorsBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { PressBlock } from './PressBlock'
import { PressCardBlock } from './PressCardBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TitleCtaBlock } from './TitleCtaBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock'
import { TitleTextCtaBlock } from './TitleTextCtaBlock'
import { TrustpilotBlock } from './TrustpilotBlock'

const blockComponents = {
  header_block: HeaderBlock,
  about_us_hero_block: AboutUsHeroBlock,
  accordion_block: AccordionBlock,
  bullet_point_block: BulletPointBlock,
  download_block: DownloadBlock,
  image_multi_text_block: ImageMultiTextBlock,
  investors_block: InvestorsBlock,
  label_block: LabelBlock,
  hero_video_block: HeroVideoBlock,
  home_hero_block: HomeHeroBlock,
  single_quote_block: SingleQuoteBlock,
  image_text_block: ImageTextBlock,
  title_text_cta_block: TitleTextCtaBlock,
  image_block: ImageBlock,
  icon_bullet_point_block: IconBulletPointBlock,
  title_paragraph_block: TitleParagraphBlock,
  title_cta_block: TitleCtaBlock,
  background_video_block: BackgroundVideoBlock,
  plain_text_block: PlainTextBlock,
  press_block: PressBlock,
  trustpilot_block: TrustpilotBlock,
  spacer_block: SpacerBlock,
  footer_block: FooterBlock,
  card_checklist_bullet_point_block: CardChecklistBulletPointBlock,
  press_card_block: PressCardBlock,
}

export const getBlockComponent = <
  TBlockType extends keyof typeof blockComponents,
  TBlockProps extends BaseBlockProps
>(
  blockType: string | TBlockType,
):
  | typeof blockComponents[TBlockType]
  | React.ComponentType<TBlockProps>
  | undefined => {
  return blockComponents[blockType as keyof typeof blockComponents] as
    | typeof blockComponents[TBlockType]
    | undefined
}
