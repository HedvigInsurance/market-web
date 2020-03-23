import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { HeadlineBlock } from './HeadlineBlock'

export default {
  title: 'Blocks/HeadlineBlock',
  component: HeadlineBlock,
  decorators: [withKnobs],
}

const headlineProps = {
  _uid: '1234',
  component: 'headline',
}

export const Default = () => (
  <HeadlineBlock
    {...headlineProps}
    color={
      minimalColorMap[
        select('CTA color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    element={select('Element', ['h1', 'h2', 'h3', 'h4'], 'h1')}
    show_hedvig_wordmark={boolean('Show wordmark', false)}
    text={text('Text', 'Hej då, pappersarbete!')}
    text_position={select(
      'Text position',
      ['left', 'right', 'center'],
      'center',
    )}
    font_size={select('Font size', ['xs', 'sm', 'md', 'lg'], 'lg')}
    use_display_font={boolean('Use display font', false)}
  />
)
