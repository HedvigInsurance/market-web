import { select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import {
  TitleParagraphBlockBrandPivot,
  TitleParagraphBlockProps,
} from './TitleParagraphBlockBrandPivot'

export default {
  title: 'Blocks/TitleParagraphBlock',
  component: TitleParagraphBlockBrandPivot,
  decorators: [withKnobs],
}

const blockProps: TitleParagraphBlockProps = {
  _uid: '5678',
  component: 'title_paragraph_block',
  title: 'Mission',
  paragraph: {
    _uid: 'cb1b3112-a685-49e9-85f6-d02a0b67deb8',
    html:
      '<p>Hedvig grundades för att utmana de traditionella försäkringsbolagen. Vårt mål var att rigga om ett orättvist system till människors fördel. När ni behövde hjälp, skulle ni knappt behöva lyfta ett finger för att få det. Inget pappersarbete, telefonköer eller medvetet krångel.</p><p>2 år och 15 000 kunder senare har vi lärt oss att omedelbar hjälp, eller vetskapen om att hjälp alltid finns tillgänglig, har haft en verklig effekt på era liv. Vi kan inte förhindra att olyckor sker (tro oss, vi har försökt), men stöttande vägledning och snabba utbetalningar verkar kunna ändra vår allas inställning till livets mest oförutsedda händelser.</p><p>Vi tror att en försäkring ska befria människor från rädsla och förstärka känslan av frihet. Hedvig är resultatet av den tron.</p>',
    plugin: 'markdown-html',
    original:
      'Hedvig grundades för att utmana de traditionella försäkringsbolagen. Vårt mål var att rigga om ett orättvist system till människors fördel. När ni behövde hjälp, skulle ni knappt behöva lyfta ett finger för att få det. Inget pappersarbete, telefonköer eller medvetet krångel. 2 år och 15 000 kunder senare har vi lärt oss att omedelbar hjälp, eller vetskapen om att hjälp alltid finns tillgänglig, har haft en verklig effekt på era liv. Vi kan inte förhindra att olyckor sker (tro oss, vi har försökt), men stöttande vägledning och snabba utbetalningar verkar kunna ändra vår allas inställning till livets mest oförutsedda händelser. Vi tror att en försäkring ska befria människor från rädsla och förstärka känslan av frihet. Hedvig är resultatet av den tron.',
  },
}

export const Default = () => (
  <TitleParagraphBlockBrandPivot
    color={
      minimalColorMap[select('color', Object.keys(minimalColorMap), 'standard')]
    }
    {...blockProps}
  />
)
