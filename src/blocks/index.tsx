import { ColumnTextBlock } from 'blocks/ColumnTextBlock/ColumnTextBlock'
import { HeroBlock } from 'blocks/HeroBlock/HeroBlock'
import { HeroImageBlockBrandPivot } from 'blocks/HeroImageBlockBrandPivot/HeroImageBlockBrandPivot'
import { ImageTextBlockBrandPivot } from 'blocks/ImageTextBlockBrandPivot'
import { SpacerBlockBrandPivot } from 'blocks/SpacerBlockBrandPivot'
import { YoutubeVideoBlock } from 'blocks/YoutubeVideoBlock/YoutubeVideoBlock'
import React from 'react'
import { AboutUsHeroBlock } from './AboutUsHeroBlock'
import { AccordionBlock } from './AccordionBlock'
import { AccordionBlockBrandPivot } from './AccordionBlockBandPivot/AccordionBlockBandPivot'
import { AppButtonsBlock } from './AppButtonsBlock'
import { BackgroundVideoBlock } from './BackgroundVideoBlock'
import { BannerBlock } from './BannerBlock/BannerBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock'
import { BulletPointBlockBrandPivot } from './BulletPointBlockBrandPivot'
import { CardChecklistBulletPointBlock } from './CardChecklistBulletPointBlock'
import { ChatBlock } from './ChatBlock/ChatBlock'
import { CtaBlock } from './CtaBlock/CtaBlock'
import { HeaderBlock } from './HeaderBlock'
import { HeaderBlockBrandPivot } from './HeaderBlockBrandPivot'
import { HeadlineBlock } from './HeadlineBlock/HeadlineBlock'
import { HeroVideoBlock } from './HeroVideoBlock'
import { HomeHeroBlock } from './HomeHeroBlock'
import { IconBulletPointBlock } from './IconBulletPointBlock'
import { ImageBlock } from './ImageBlock'
import { ImageBlockBrandPivot } from './ImageBlockBrandPivot/ImageBlockBrandPivot'
import { ImageMultiTextBlock } from './ImageMultiTextBlock'
import { ImageTextBlock } from './ImageTextBlock'
import { InsuranceInfoBlock } from './InsuranceInfoBlock/InsuranceInfoBlock'
import { InvestorsBlock } from './InvestorsBlock'
import { PerilsBlock } from './PerilsBlock/PerilsBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { PressBlock } from './PressBlock'
import { PressCardBlock } from './PressCardBlock'
import { QuoteBlockBrandPivot } from './QuoteBlockBrandPivot/QuoteBlockBrandPivot'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TitleCtaBlock } from './TitleCtaBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock'
import { TitleParagraphBlockBrandPivot } from './TitleParagraphBlockBrandPivot/TitleParagraphBlockBrandPivot'
import { TitleTextCtaBlock } from './TitleTextCtaBlock'
import { TrustpilotBlock } from './TrustpilotBlock'

const blockComponents = {
  app_buttons_block: AppButtonsBlock,
  header_block: HeaderBlock,
  header_block_brand_pivot: HeaderBlockBrandPivot,
  about_us_hero_block: AboutUsHeroBlock,
  accordion_block: AccordionBlock,
  accordion_block_brand_pivot: AccordionBlockBrandPivot,
  banner_block: BannerBlock,
  bullet_point_block: BulletPointBlock,
  bullet_point_block_brand_pivot: BulletPointBlockBrandPivot,
  column_text_block: ColumnTextBlock,
  chat_block: ChatBlock,
  cta_block: CtaBlock,
  image_multi_text_block: ImageMultiTextBlock,
  image_text_block: ImageTextBlock,
  image_text_block_brand_pivot: ImageTextBlockBrandPivot,
  investors_block: InvestorsBlock,
  headline_block: HeadlineBlock,
  hero_video_block: HeroVideoBlock,
  hero_block: HeroBlock,
  hero_image_block_brand_pivot: HeroImageBlockBrandPivot,
  home_hero_block: HomeHeroBlock,
  quote_block: QuoteBlockBrandPivot,
  single_quote_block: SingleQuoteBlock,
  title_text_cta_block: TitleTextCtaBlock,
  image_block: ImageBlock,
  image_block_brand_pivot: ImageBlockBrandPivot,
  icon_bullet_point_block: IconBulletPointBlock,
  insurance_info_block: InsuranceInfoBlock,
  title_paragraph_block: TitleParagraphBlock,
  title_paragraph_block_brand_pivot: TitleParagraphBlockBrandPivot,
  title_cta_block: TitleCtaBlock,
  background_video_block: BackgroundVideoBlock,
  plain_text_block: PlainTextBlock,
  perils_block: PerilsBlock,
  press_block: PressBlock,
  trustpilot_block: TrustpilotBlock,
  spacer_block: SpacerBlock,
  spacer_block_brand_pivot: SpacerBlockBrandPivot,
  card_checklist_bullet_point_block: CardChecklistBulletPointBlock,
  press_card_block: PressCardBlock,
  youtube_video_block: YoutubeVideoBlock,
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
