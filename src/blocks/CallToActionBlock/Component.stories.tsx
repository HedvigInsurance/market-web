import React from 'react'
import { select, withKnobs } from '@storybook/addon-knobs'
import { minimalColorMap, link } from 'utils/storybook'
import CallToActionBlockContainer from './Container'
import CallToActionBlock from './Component'

export default {
  title: 'Blocks/CallToActionBlock',
  component: CallToActionBlockContainer,
  decorators: [withKnobs],
}

export const Default = () => {
  const wrapperSize = select('Wrapper size', ['none', 'sm', 'lg', 'xl'], 'sm')

  const colorKeys = Object.keys(minimalColorMap)
  const wrapperColor =
    minimalColorMap[select('Background color', colorKeys, 'standard-inverse')]
      .color

  const buttonColor =
    minimalColorMap[select('Button color', colorKeys, 'standard-inverse')].color

  const buttonStyleType = select(
    'Button style',
    ['outlined', 'filled'],
    'outlined',
  )

  const buttonSize = select('Button size', ['sm', 'md', 'lg'], 'lg')

  return (
    <CallToActionBlock.Wrapper background={wrapperColor} size={wrapperSize}>
      <CallToActionBlock.Button
        href={link.url}
        color={buttonColor}
        styleType={buttonStyleType}
        size={buttonSize}
      >
        Läs mer om vårt skydd
      </CallToActionBlock.Button>
    </CallToActionBlock.Wrapper>
  )
}
