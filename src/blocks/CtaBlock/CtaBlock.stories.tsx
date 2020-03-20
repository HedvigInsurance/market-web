import { select, withKnobs } from '@storybook/addon-knobs'
import * as React from 'react'
import { link, minimalColorMap } from 'utils/storybook'
import { CtaBlock, CtaBlockProps } from './CtaBlock'

export default {
  title: 'Blocks/CtaBlock',
  component: CtaBlock,
  decorators: [withKnobs],
}

const ctaProps: CtaBlockProps = {
  _uid: '5678',
  component: 'cta_block',
  cta_label: 'Läs mer om vårt skydd',
  cta_link: link,
}

export const Default = () => (
  <CtaBlock
    {...ctaProps}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    size={select('Block size', ['none', 'sm', 'lg', 'xl'], 'sm')}
    cta_color={
      minimalColorMap[
        select('CTA color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    cta_style={select('CTA style', ['outlined', 'filled'], 'outlined')}
    cta_size={select('CTA size', ['sm', 'md', 'lg'], 'lg')}
  />
)
