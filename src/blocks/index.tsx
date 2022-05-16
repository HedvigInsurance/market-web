import React from 'react'
import { ColumnTextBlock } from 'blocks/ColumnTextBlock/ColumnTextBlock'
import { HeroBlock } from 'blocks/HeroBlock/HeroBlock'
import { ImageTextBlock } from 'blocks/ImageTextBlock'
import { YoutubeVideoBlock } from 'blocks/YoutubeVideoBlock/YoutubeVideoBlock'
import { TitleParagraphBlock } from './TitleParagraphBlock/TitleParagraphBlock'
import { HeroImageBlock } from './HeroImageBlock/HeroImageBlock'
import { HeaderBlock } from './HeaderBlock'
import { AccordionBlock } from './AccordionBlock/AccordionBlock'
import { AppButtonsBlock } from './AppButtonsBlock'
import { BackgroundVideoBlock } from './BackgroundVideoBlock'
import { BannerBlock } from './BannerBlock/BannerBlock'
import { BaseBlockProps } from './BaseBlockProps'
import { BulletPointBlock } from './BulletPointBlock/BulletPointBlock'
import { CtaBlock } from './CtaBlock/CtaBlock'
import { HeadlineBlock } from './HeadlineBlock/HeadlineBlock'
import { ImageBlock } from './ImageBlock/ImageBlock'
import { InsuranceInfoBlock } from './InsuranceInfoBlock/InsuranceInfoBlock'
import { PerilsBlock } from './PerilsBlock/PerilsBlock'
import { PlainTextBlock } from './PlainTextBlock'
import { QuoteBlock } from './QuoteBlock/QuoteBlock'
import { SingleQuoteBlock } from './SingleQuoteBlock'
import { SpacerBlock } from './SpacerBlock'
import { TrustpilotBlock } from './TrustpilotBlock/TrustpilotBlock'
import { TableBlock } from './TableBlock/TableBlock'

const blockComponents = {
  accordion_block_brand_pivot: AccordionBlock,
  accordion_block: AccordionBlock,
  app_buttons_block: AppButtonsBlock,
  background_video_block: BackgroundVideoBlock,
  banner_block: BannerBlock,
  bullet_point_block: BulletPointBlock,
  column_text_block: ColumnTextBlock,
  cta_block: CtaBlock,
  header_block_brand_pivot: HeaderBlock,
  header_block: HeaderBlock,
  headline_block: HeadlineBlock,
  hero_block: HeroBlock,
  hero_image_block_brand_pivot: HeroImageBlock,
  hero_image_block: HeroImageBlock,
  image_block: ImageBlock,
  image_text_block: ImageTextBlock,
  insurance_info_block: InsuranceInfoBlock,
  perils_block: PerilsBlock,
  plain_text_block: PlainTextBlock,
  quote_block: QuoteBlock,
  single_quote_block: SingleQuoteBlock,
  spacer_block_brand_pivot: SpacerBlock,
  spacer_block: SpacerBlock,
  table_block: TableBlock,
  title_paragraph_block_brand_pivot: TitleParagraphBlock,
  title_paragraph_block: TitleParagraphBlock,
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
