import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  ContentWrapper,
  LAPTOP_BP_UP,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import React from 'react'
import { BrandPivotBaseBlockProps, TextField } from '../BaseBlockProps'

export interface ChatBlockProps extends BrandPivotBaseBlockProps {
  messages: TextField[]
}

const ChatItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ChatItem = styled.div`
  display: inline-flex;
  max-width: calc(100% - 5rem);
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  ${TABLET_BP_UP} {
    max-width: 49%;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    font-size: 1.5rem;
    border-radius: 1rem;
  }

  ${LAPTOP_BP_UP} {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 2.25rem;
    font-size: 2.25rem;
    line-height: 1.25;
    border-radius: 1.5rem;
  }

  &:nth-child(odd) {
    background-color: ${colorsV3.gray800};
  }

  &:nth-child(even) {
    align-self: flex-end;
    background-color: ${colorsV3.gray700};
  }
`

export const ChatBlock: React.FC<ChatBlockProps> = ({
  color,
  index,
  size,
  messages,
}) => {
  return (
    <SectionWrapper brandPivot colorComponent={color} size={size}>
      <ContentWrapper brandPivot fullWidth index={index}>
        <ChatItems>
          {messages.map((message) => (
            <ChatItem key={message._uid}>{message.text}</ChatItem>
          ))}
        </ChatItems>
      </ContentWrapper>
    </SectionWrapper>
  )
}
