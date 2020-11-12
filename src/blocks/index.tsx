import React, { createContext } from 'react'
import { BaseBlockProps } from './BaseBlockProps'

const blockComponents: Record<
  string,
  () => Promise<React.ComponentType<any>>
> = {
  app_buttons_block: () =>
    import(
      /* webpackChunkName: 'app_buttons_block' */ './AppButtonsBlock'
    ).then((m) => m.AppButtonsBlock),
  header_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'header_block_brand_pivot' */ './HeaderBlockBrandPivot'
    ).then((m) => m.HeaderBlockBrandPivot),
  accordion_block: () =>
    import(
      /* webpackChunkName: 'accordion_block' */ './AccordionBlock/AccordionBlock'
    ).then((m) => m.AccordionBlock),
  accordion_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'accordion_block' */ './AccordionBlock/AccordionBlock'
    ).then((m) => m.AccordionBlock),
  banner_block: () =>
    import(
      /* webpackChunkName: 'banner_block' */ './BannerBlock/BannerBlock'
    ).then((m) => m.BannerBlock),
  bullet_point_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'bullet_point_block_brand_pivot' */ './BulletPointBlockBrandPivot'
    ).then((m) => m.BulletPointBlockBrandPivot),
  column_text_block: () =>
    import(
      /* webpackChunkName: 'column_text_block' */ './ColumnTextBlock/ColumnTextBlock'
    ).then((m) => m.ColumnTextBlock),
  cta_block: () =>
    import(/* webpackChunkName: 'cta_block' */ './CtaBlock/CtaBlock').then(
      (m) => m.CtaBlock,
    ),
  image_text_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'image_text_block_brand_pivot' */ './ImageTextBlockBrandPivot'
    ).then((m) => m.ImageTextBlockBrandPivot),
  headline_block: () =>
    import(
      /* webpackChunkName: 'headline_block' */ './HeadlineBlock/HeadlineBlock'
    ).then((m) => m.HeadlineBlock),
  hero_block: () =>
    import(/* webpackChunkName: 'hero_block' */ './HeroBlock/HeroBlock').then(
      (m) => m.HeroBlock,
    ),
  hero_image_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'hero_image_block_brand_pivot' */ './HeroImageBlockBrandPivot/HeroImageBlockBrandPivot'
    ).then((m) => m.HeroImageBlockBrandPivot),
  quote_block: () =>
    import(
      /* webpackChunkName: 'quote_block_brand_pivot' */ './QuoteBlockBrandPivot/QuoteBlockBrandPivot'
    ).then((m) => m.QuoteBlockBrandPivot),
  single_quote_block: () =>
    import(
      /* webpackChunkName: 'single_quote_block' */ './SingleQuoteBlock'
    ).then((m) => m.SingleQuoteBlock),
  image_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'image_block_brand_pivot' */ './ImageBlockBrandPivot/ImageBlockBrandPivot'
    ).then((m) => m.ImageBlockBrandPivot),
  insurance_info_block: () =>
    import(
      /* webpackChunkName: 'insurance_info_block' */ './InsuranceInfoBlock/InsuranceInfoBlock'
    ).then((m) => m.InsuranceInfoBlock),
  title_paragraph_block_brand_pivot: () =>
    import(
      /* webpackChunkName: 'title_paragraph_block_brand_pivot' */ './TitleParagraphBlockBrandPivot/TitleParagraphBlockBrandPivot'
    ).then((m) => m.TitleParagraphBlockBrandPivot),
  background_video_block: () =>
    import(
      /* webpackChunkName: 'background_video_block' */ './BackgroundVideoBlock'
    ).then((m) => m.BackgroundVideoBlock),
  plain_text_block: () =>
    import(/* webpackChunkName: 'plain_text_block' */ './PlainTextBlock').then(
      (m) => m.PlainTextBlock,
    ),
  perils_block: () =>
    import(
      /* webpackChunkName: 'perils_block' */ './PerilsBlock/PerilsBlock'
    ).then((m) => m.PerilsBlock),
  spacer_block: () =>
    import(/* webpackChunkName: 'spacer_block' */ './SpacerBlock').then(
      (m) => m.SpacerBlock,
    ),
  spacer_block_brand_pivot: () =>
    import(/* webpackChunkName: 'spacer_block' */ './SpacerBlock').then(
      (m) => m.SpacerBlock,
    ),
  youtube_video_block: () =>
    import(
      /* webpackChunkName: 'youtube_video_block' */ './YoutubeVideoBlock/YoutubeVideoBlock'
    ).then((m) => m.YoutubeVideoBlock),
}

export const getBlockComponent = <
  TBlockType extends keyof typeof blockComponents,
  TBlockProps extends BaseBlockProps
>(
  blockType: string | TBlockType,
): Promise<React.ComponentType<TBlockProps> | undefined> => {
  const blockComponentLoader =
    blockComponents[blockType as keyof typeof blockComponents]

  if (blockComponentLoader) {
    return blockComponentLoader()
  }

  return Promise.resolve(undefined)
}

type BlockComponentMap = Record<
  string,
  React.ComponentType<BaseBlockProps & any>
>
export const getBlockComponentMap = async (
  blockTypes: ReadonlyArray<string>,
): Promise<BlockComponentMap> => {
  const blockComponents = await Promise.all(
    blockTypes.map((component) => getBlockComponent(component)),
  )
  return blockTypes.reduce(
    (acc, blockType, i) => ({ [blockType]: blockComponents[i], ...acc }),
    {},
  )
}

export const BlockContext = createContext<BlockComponentMap>({})
