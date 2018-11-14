import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { BaseBlockProps } from './BaseBlockProps'

const SectionComponent = styled('section')(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '120px 20px',
    background: backgroundColor,
  }),
)

const TitleComponent = styled('h2')(
  ({ titleColor }: { titleColor: string }) => ({
    color: titleColor,
  }),
)

const FilledButtonComponent = styled('button')({
  color: 'white',
  backgroundColor: colors.GREEN,
  border: 'none',
  padding: '20px',
})

const HollowButtonComponent = styled('button')({
  color: colors.GREEN,
  backgroundColor: 'transparent',
  border: `2px solid ${colors.GREEN}`,
  padding: '20px',
})

interface CallToActionSectionInterface extends BaseBlockProps {
  title: string
  buttonText: string
  buttonType: 'filled' | 'hollow'
  titleColor: string
  backgroundColor: string
}

export const CallToActionSection: React.SFC<CallToActionSectionInterface> = ({
  title = '',
  titleColor = '',
  buttonText = '',
  buttonType = 'filled',
  backgroundColor = '',
}) => {
  const buttonComponents = {
    filled: FilledButtonComponent,
    hollow: HollowButtonComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[buttonType]

  return (
    <SectionComponent backgroundColor={backgroundColor}>
      <TitleComponent titleColor={titleColor}>{title}</TitleComponent>
      <ButtonComponent>{buttonText}</ButtonComponent>
    </SectionComponent>
  )
}
