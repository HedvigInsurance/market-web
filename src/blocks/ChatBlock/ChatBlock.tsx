import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  ContentWrapper,
  LAPTOP_BP_UP,
  MOBILE_BP_UP,
  SectionWrapper,
} from 'components/blockHelpers'
import React from 'react'
import ReactVisibilitySensor from 'react-visibility-sensor'
import { BrandPivotBaseBlockProps, TextField } from '../BaseBlockProps'

export interface ChatBlockProps extends BrandPivotBaseBlockProps {
  messages: TextField[]
}

export const TABLET_BP_UP = '@media (min-width: 768px)'

const ChatItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ChatItem = styled.div<{ visible: boolean }>`
  display: inline-flex;
  max-width: calc(100% - 5rem);
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 800ms, transform 500ms;

  &:nth-of-type(odd) {
    background-color: ${colorsV3.gray800};
    transform: ${(props) =>
      props.visible ? 'translateX(0)' : 'translateX(-10%)'};
  }

  &:nth-of-type(even) {
    align-self: flex-end;
    background-color: ${colorsV3.gray700};
    transform: ${(props) =>
      props.visible ? 'translateX(0)' : 'translateX(10%)'};
  }

  ${MOBILE_BP_UP} {
    max-width: 60%;
  }

  ${TABLET_BP_UP} {
    max-width: 49%;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
    padding: 1.5rem;
    font-size: 1.5rem;
    border-radius: 1rem;

    &:nth-of-type(odd) {
      transform: ${(props) =>
        props.visible ? 'translateX(0)' : 'translateX(-5%)'};
    }

    &:nth-of-type(even) {
      transform: ${(props) =>
        props.visible ? 'translateX(0)' : 'translateX(5%)'};
    }
  }

  ${LAPTOP_BP_UP} {
    margin-top: 2rem;
    margin-bottom: 2rem;
    padding: 2.25rem;
    font-size: 2.25rem;
    line-height: 1.25;
    border-radius: 1.5rem;
  }
`

export const ChatBlock: React.FC<ChatBlockProps> = ({
  color,
  size,
  messages,
}) => {
  return (
    <SectionWrapper brandPivot colorComponent={color} size={size}>
      <ContentWrapper brandPivot fullWidth>
        <ChatItems>
          {messages.map((message) => (
            <ReactVisibilitySensor
              partialVisibility
              key={message._uid}
              offset={{
                top: -500,
                bottom:
                  typeof window !== 'undefined' ? window.innerHeight / 6 : 0,
              }}
            >
              {({ isVisible }) => (
                <ChatItem visible={isVisible}>{message.text}</ChatItem>
              )}
            </ReactVisibilitySensor>
          ))}
        </ChatItems>
      </ContentWrapper>
    </SectionWrapper>
  )
}
