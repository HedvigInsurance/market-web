import * as React from 'react'
import styled from 'react-emotion'
import { SizeContainer } from '../components/SizeContainer'
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

const ContentContainer = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    display: 'flex',
    flexDirection: textPosition === 'right' ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  }),
)

const TextContainer = styled('div')(
  ({ textPosition }: { textPosition: string }) => ({
    textAlign: textPosition === 'center' ? 'center' : 'left',
    width: '60%',
    paddingRight: textPosition === 'left' ? '120px' : '0',
    paddingLeft: textPosition === 'right' ? '120px' : '0',
  }),
)

const TitleComponent = styled('h2')(
  ({ titleColor }: { titleColor: string }) => ({
    color: titleColor,
    fontSize: '48px',
    marginBottom: '25px',
  }),
)

const ParagraphComponent = styled('p')(
  ({ paragraphColor }: { paragraphColor: string }) => ({
    color: paragraphColor,
    fontSize: '20px',
    marginBottom: '47px',
  }),
)

const ImageComponent = styled('img')({
  width: '40%',
})

interface ImageTextBlockInterface extends BaseBlockProps {
  title: string
  titleColor: string
  paragraphColor: string
  textPosition: string
  paragraph: string
  buttonText: string
  buttonType: 'filled' | 'outlined'
  image: string
  backgroundColor: string
}

export const ImageTextBlock: React.SFC<ImageTextBlockInterface> = ({
  title = '',
  titleColor = '',
  paragraphColor = '',
  textPosition = '',
  paragraph = '',
  buttonText = '',
  buttonType = 'filled',
  image = '',
  backgroundColor = '',
}) => {
  const buttonComponents = {
    filled: FilledButtonComponent,
    outlined: OutlinedButtonComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[buttonType]

  return (
    <SectionComponent backgroundColor={backgroundColor}>
      <SizeContainer>
        <ContentContainer className="Container" textPosition={textPosition}>
          <TextContainer textPosition={textPosition}>
            <TitleComponent titleColor={titleColor}>{title}</TitleComponent>
            <ParagraphComponent paragraphColor={paragraphColor}>
              {paragraph}
            </ParagraphComponent>
            <ButtonComponent>{buttonText}</ButtonComponent>
          </TextContainer>
          {textPosition !== 'center' && <ImageComponent src={image} />}
        </ContentContainer>
      </SizeContainer>
    </SectionComponent>
  )
}
