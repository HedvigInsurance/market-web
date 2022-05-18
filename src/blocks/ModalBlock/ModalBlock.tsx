import React, { useState } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { ContentWrapper, TABLET_BP_UP } from 'components/blockHelpers'
import { Modal } from 'components/Modal/Modal'
import { BaseBlockProps } from '../BaseBlockProps'
import { getBlockComponent } from '..'

type ModalBlockProps = BaseBlockProps & {
  label?: string
  modal_content: any
  modal_max_width?: number
}

const TextButton = styled.button({
  display: 'flex',
  margin: '0 auto',
  padding: 0,
  color: colorsV3.purple900,
  fontSize: '1.125rem',
  border: 'none',
  cursor: 'pointer',
  background: 'none',
  transition: 'color 0.1s ease',

  ':focus': {
    outline: 'none',
  },

  [TABLET_BP_UP]: {
    fontSize: '1.25rem',
  },
})

export const ModalBlock = ({
  index,
  label,
  modal_content,
  modal_max_width,
}: ModalBlockProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleClick = () => setIsVisible(true)
  return (
    <ContentWrapper brandPivot index={index}>
      <TextButton onClick={handleClick}>{label}</TextButton>
      <Modal
        dynamicHeight
        isVisible={isVisible}
        maxWidth={`${modal_max_width}px`}
        onClose={() => setIsVisible(false)}
      >
        {modal_content.map((block: any, index: any) => {
          const BlockComponent:
            | React.ComponentType<BaseBlockProps & any>
            | undefined = getBlockComponent(block.component)

          if (!BlockComponent) {
            return null
          }

          return <BlockComponent key={block._uid} index={index} {...block} />
        })}
      </Modal>
    </ContentWrapper>
  )
}
