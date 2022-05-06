import React, { useState, useEffect } from 'react'
import { AnimateSharedLayout } from 'framer-motion'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { LAPTOP_BP_UP } from '../blockHelpers'
import { Tab } from './Tab'

const TabList = styled.div`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`

const TabContainer = styled.div`
  position: relative;
  margin-bottom: 1.25rem;

  ${LAPTOP_BP_UP} {
    margin-bottom: 2.5rem;
  }
`

const UnderlineBackground = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${colorsV3.gray300};
  position: absolute;
  bottom: 0;
`

const TabPanel = styled.div``

type Props = {
  items: {
    id: string
    name: string
    content: React.ReactNode
  }[]
}
type TabItem = {
  id: string
  name: string
  content: any
}

export const Tabs: React.FC<Props> = ({ items }) => {
  const [selected, setSelected] = useState(items[0])

  const handleClick = (item: TabItem) => {
    setSelected(item)
  }

  useEffect(() => {
    setSelected((selectedItem) => {
      const matchingItem = items.find((item) => item.id === selectedItem.id)
      return matchingItem ?? items[0]
    })
  }, [items])

  return (
    <>
      <TabContainer>
        <TabList
          role="tablist"
          aria-orientation="horizontal"
          aria-label="InsurancePick"
        >
          <AnimateSharedLayout>
            {items.map((item, index) => (
              <Tab
                key={index}
                onClick={() => handleClick(item)}
                selected={selected === item}
                name={item.name}
              />
            ))}
          </AnimateSharedLayout>
        </TabList>
        <UnderlineBackground />
      </TabContainer>

      {selected.content && (
        <TabPanel
          tabIndex={0}
          role="tabpanel"
          id={selected.name}
          aria-labelledby={selected.name}
        >
          {selected.content}
        </TabPanel>
      )}
    </>
  )
}
