import React from 'react'
import { ColumnTextBlock } from 'blocks/ColumnTextBlock/ColumnTextBlock'
import { HeroBlock } from 'blocks/HeroBlock/HeroBlock'
import { HeroImageBlockBrandPivot } from 'blocks/HeroImageBlockBrandPivot/HeroImageBlockBrandPivot'
import { ImageTextBlockBrandPivot } from 'blocks/ImageTextBlockBrandPivot'
import { YoutubeVideoBlock } from 'blocks/YoutubeVideoBlock/YoutubeVideoBlock'
import { AccordionBlock } from './AccordionBlock/AccordionBlock'
import { AppButtonsBlock } from './AppButtonsBlock'
import { BackgroundVideoBlock } from './BackgroundVideoBlock'
import { BannerBlock } from './BannerBlock/BannerBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock/BulletPointBlock'
import { CtaBlock } from './CtaBlock/CtaBlock'
import { HeaderBlock } from './HeaderBlockBrandPivot'
import { HeadlineBlock } from './HeadlineBlock/HeadlineBlock'
import { ImageBlockBrandPivot } from './ImageBlockBrandPivot/ImageBlockBrandPivot'
import { InsuranceInfoBlock } from './InsuranceInfoBlock/InsuranceInfoBlock'
import { PerilsBlock } from './PerilsBlock/PerilsBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { QuoteBlockBrandPivot } from './QuoteBlockBrandPivot/QuoteBlockBrandPivot'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TitleParagraphBlockBrandPivot } from './TitleParagraphBlockBrandPivot/TitleParagraphBlockBrandPivot'
import { TrustpilotBlock } from './TrustpilotBlock/TrustpilotBlock'

const blockComponents = {
  app_buttons_block: AppButtonsBlock,
  header_block_brand_pivot: HeaderBlock,
  accordion_block: AccordionBlock,
  accordion_block_brand_pivot: AccordionBlock,
  banner_block: BannerBlock,
  bullet_point_block: BulletPointBlock,
  column_text_block: ColumnTextBlock,
  cta_block: CtaBlock,
  image_text_block_brand_pivot: ImageTextBlockBrandPivot,
  headline_block: HeadlineBlock,
  hero_block: HeroBlock,
  hero_image_block_brand_pivot: HeroImageBlockBrandPivot,
  quote_block: QuoteBlockBrandPivot,
  single_quote_block: SingleQuoteBlock,
  image_block_brand_pivot: ImageBlockBrandPivot,
  insurance_info_block: InsuranceInfoBlock,
  title_paragraph_block_brand_pivot: TitleParagraphBlockBrandPivot,
  background_video_block: BackgroundVideoBlock,
  plain_text_block: PlainTextBlock,
  perils_block: PerilsBlock,
  spacer_block: SpacerBlock,
  spacer_block_brand_pivot: SpacerBlock,
  trustpilot_block: TrustpilotBlock,
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
