import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { BaseBlockProps, NativeColorPickerComponent } from './BaseBlockProps'

import {
  FilledButtonComponent,
  OutlinedButtonComponent,
} from '../components/Buttons'

const SectionBackgroundColorComponent = styled(SectionWrapper)(
  ({ backgroundColor }: { backgroundColor: string }) => ({
    backgroundColor,
  }),
)

const FlexboxContentWrapperComponent = styled(ContentWrapper)({
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

interface TitleCtaBlockInterface extends BaseBlockProps {
  _uid: string
  title: string
  button_title: string
  button_type: 'filled' | 'outlined'
  title_color: string
  background_color: NativeColorPickerComponent
}

export const TitleCtaBlock: React.SFC<TitleCtaBlockInterface> = ({
  title,
  title_color,
  button_title,
  button_type,
  background_color,
}) => {
  const buttonComponents = {
    filled: FilledButtonComponent,
    outlined: OutlinedButtonComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[button_type]

  return (
    <SectionBackgroundColorComponent backgroundColor={background_color.color}>
      <FlexboxContentWrapperComponent>
        <TitleComponent titleColor={title_color}>{title}</TitleComponent>
        <ButtonComponent>{button_title}</ButtonComponent>
      </FlexboxContentWrapperComponent>
    </SectionBackgroundColorComponent>
  )
}
