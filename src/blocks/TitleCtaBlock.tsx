import * as React from 'react'
import styled from 'react-emotion'
import { BaseBlockProps } from './BaseBlockProps'

import {
  FilledButtonComponent,
  OutlinedButtonComponent,
} from '../components/Buttons'

const SectionComponent = styled('section')(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    width: '100%',
    background: backgroundColor,
    paddingTop: '120px',
    paddingBottom: '120px',
  }),
)

const ContentContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

const TitleComponent = styled('h2')(
  ({ titleColor }: { titleColor: string }) => ({
    color: titleColor,
    fontSize: '48px',
    paddingRight: '120px',
  }),
)

interface CtaBlockInterface extends BaseBlockProps {
  title: string
  buttonText: string
  buttonType: 'filled' | 'outlined'
  titleColor: string
  backgroundColor: string
}

export const TitleCtaBlock: React.SFC<CtaBlockInterface> = ({
  title = '',
  titleColor = '',
  buttonText = '',
  buttonType = 'filled',
  backgroundColor = '',
}) => {
  const buttonComponents = {
    filled: FilledButtonComponent,
    outlined: OutlinedButtonComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[buttonType]

  return (
    <SectionComponent backgroundColor={backgroundColor}>
      <ContentContainer className="Container">
        <TitleComponent titleColor={titleColor}>{title}</TitleComponent>
        <ButtonComponent>{buttonText}</ButtonComponent>
      </ContentContainer>
    </SectionComponent>
  )
}
