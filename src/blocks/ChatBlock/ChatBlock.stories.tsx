import { select, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { minimalColorMap } from 'utils/storybook'
import { ChatBlock } from './ChatBlock'

export default {
  title: 'Blocks/ChatBlock',
  component: ChatBlock,
  decorators: [withKnobs],
}

const ctaProps = {
  _uid: '5678',
  component: 'cta_block',
  messages: [
    {
      _uid: '1',
      component: 'text_field',
      text: 'Hej Stella! Vad har hänt?',
    },
    {
      _uid: '2',
      component: 'text_field',
      text:
        'Imorse när jag åt frukost på ett fik blev jag bestulen på min nya iPad. Jag köpte den för 4300 kr, förra veckan.',
    },
    {
      _uid: '3',
      component: 'text_field',
      text:
        'Tråkigt att höra! Eftersom du köpte den så nyligen får du tillbaka hela summan. Kolla kontot!',
    },
  ],
}

export const Default = () => (
  <ChatBlock
    {...ctaProps}
    color={
      minimalColorMap[
        select('color', Object.keys(minimalColorMap), 'standard-inverse')
      ]
    }
    size={select('Block size', ['none', 'sm', 'lg', 'xl'], 'sm')}
  />
)
