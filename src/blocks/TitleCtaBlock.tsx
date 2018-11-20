import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps } from './BaseBlockProps'

import {
  FilledButtonComponent,
  OutlinedButtonComponent,
} from '../components/Buttons'

const FlexboxContentWrapperComponent = styled(ContentWrapper)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

const TitleComponent = styled('h2')({
  fontSize: '3rem',
  paddingRight: '7rem',
})

interface TitleCtaBlockInterface extends BaseBlockProps {
  _uid: string
  title: string
  button_title: string
  button_type: 'filled' | 'outlined'
}

export const TitleCtaBlock: React.FunctionComponent<TitleCtaBlockInterface> = ({
  title,
  button_title,
  button_type,
  color,
}) => {
  const buttonComponents = {
    filled: FilledButtonComponent,
    outlined: OutlinedButtonComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[button_type]

  return (
    <SectionWrapper color={color && color.color}>
      <FlexboxContentWrapperComponent>
        <TitleComponent>{title}</TitleComponent>
        <ButtonComponent>{button_title}</ButtonComponent>
      </FlexboxContentWrapperComponent>
    </SectionWrapper>
  )
}
