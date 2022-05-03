import React from 'react'
import { Tabs } from './Tabs'

const mockInsurances = [
  {
    id: '1',
    name: 'Hemförsäkring',
    content: 'one',
  },
  {
    id: '2',
    name: 'Olycksfallsförsäkring',
    content: 'two ',
  },
  {
    id: '3',
    name: 'Inbo',
    content: 'three',
  },
]

export default {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    backgrounds: { default: 'gray100' },
  },
}

export const Default = () => {
  return <Tabs items={mockInsurances} />
}
