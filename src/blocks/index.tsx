import { ColumnTextBlock } from 'blocks/ColumnTextBlock/ColumnTextBlock'
import { HeroBlock } from 'blocks/HeroBlock/HeroBlock'
import { HeroImageBlockBrandPivot } from 'blocks/HeroImageBlockBrandPivot/HeroImageBlockBrandPivot'
import { ImageTextBlockBrandPivot } from 'blocks/ImageTextBlockBrandPivot'
import { SpacerBlockBrandPivot } from 'blocks/SpacerBlockBrandPivot'
import { YoutubeVideoBlock } from 'blocks/YoutubeVideoBlock/YoutubeVideoBlock'
import React from 'react'
import { AboutUsHeroBlock } from './AboutUsHeroBlock'
import { AccordionBlockBrandPivot } from './AccordionBlockBandPivot/AccordionBlockBandPivot'
import { AppButtonsBlock } from './AppButtonsBlock'
import { BackgroundVideoBlock } from './BackgroundVideoBlock'
import { BannerBlock } from './BannerBlock/BannerBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlockBrandPivot } from './BulletPointBlockBrandPivot'
import { ChatBlock } from './ChatBlock/ChatBlock'
import { CtaBlock } from './CtaBlock/CtaBlock'
import { HeaderBlockBrandPivot } from './HeaderBlockBrandPivot'
import { HeadlineBlock } from './HeadlineBlock/HeadlineBlock'
import { HeroVideoBlock } from './HeroVideoBlock'
import { HomeHeroBlock } from './HomeHeroBlock'
import { ImageBlockBrandPivot } from './ImageBlockBrandPivot/ImageBlockBrandPivot'
import { InsuranceInfoBlock } from './InsuranceInfoBlock/InsuranceInfoBlock'
import { InvestorsBlock } from './InvestorsBlock'
import { PerilsBlock } from './PerilsBlock/PerilsBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { QuoteBlockBrandPivot } from './QuoteBlockBrandPivot/QuoteBlockBrandPivot'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TitleParagraphBlockBrandPivot } from './TitleParagraphBlockBrandPivot/TitleParagraphBlockBrandPivot'
import { TrustpilotBlock } from './TrustpilotBlock'

const blockComponents = {
  app_buttons_block: AppButtonsBlock,
  header_block_brand_pivot: HeaderBlockBrandPivot,
  about_us_hero_block: AboutUsHeroBlock,
  accordion_block: AccordionBlockBrandPivot,
  accordion_block_brand_pivot: AccordionBlockBrandPivot,
  banner_block: BannerBlock,
  bullet_point_block_brand_pivot: BulletPointBlockBrandPivot,
  column_text_block: ColumnTextBlock,
  chat_block: ChatBlock,
  cta_block: CtaBlock,
  image_text_block_brand_pivot: ImageTextBlockBrandPivot,
  investors_block: InvestorsBlock,
  headline_block: HeadlineBlock,
  hero_video_block: HeroVideoBlock,
  hero_block: HeroBlock,
  hero_image_block_brand_pivot: HeroImageBlockBrandPivot,
  home_hero_block: HomeHeroBlock,
  quote_block: QuoteBlockBrandPivot,
  single_quote_block: SingleQuoteBlock,
  image_block_brand_pivot: ImageBlockBrandPivot,
  insurance_info_block: InsuranceInfoBlock,
  title_paragraph_block_brand_pivot: TitleParagraphBlockBrandPivot,
  background_video_block: BackgroundVideoBlock,
  plain_text_block: PlainTextBlock,
  perils_block: PerilsBlock,
  trustpilot_block: TrustpilotBlock,
  spacer_block: SpacerBlock,
  spacer_block_brand_pivot: SpacerBlockBrandPivot,
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
