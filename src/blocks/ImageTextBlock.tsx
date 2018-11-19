import * as React from 'react'
import styled from 'react-emotion'
import { SizeContainer } from '../components/SizeContainer'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

import {
  FilledButtonComponent,
  OutlinedButtonComponent,
} from '../components/Buttons'

const FilledButtonWithMarginComponent = styled(FilledButtonComponent)({
  marginTop: '47px',
})

const OutlinedButtonWithMarginComponent = styled(OutlinedButtonComponent)({
  marginTop: '47px',
})

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
    width: '100%',
    paddingRight: textPosition === 'left' ? '120px' : '0',
    paddingLeft: textPosition === 'right' ? '120px' : '0',
  }),
)

const TitleComponent = styled('h2')(
  ({ titleColor }: { titleColor: string }) => ({
    color: titleColor,
    fontSize: '48px',
  }),
)

const ParagraphComponent = styled('div')(
  ({ paragraphColor }: { paragraphColor: string }) => ({
    color: paragraphColor,
    fontSize: '20px',
    marginTop: '25px',
  }),
)

const ImageComponent = styled('img')({
  width: '40%',
})

interface ImageTextBlockInterface extends BaseBlockProps {
  title: string
  titleColor: string
  paragraph: MarkdownHtmlComponent
  paragraphColor: string
  textPosition: string
  buttonText: string
  buttonType: 'filled' | 'outlined'
  showButton: true | false
  image: string
  backgroundColor: string
}

export const ImageTextBlock: React.SFC<ImageTextBlockInterface> = ({
  title = '',
  titleColor = '',
  paragraph = {},
  paragraphColor = '',
  textPosition = '',
  buttonText = '',
  buttonType = 'filled',
  showButton = true,
  image = '',
  backgroundColor = '',
}) => {
  const buttonComponents = {
    filled: FilledButtonWithMarginComponent,
    outlined: OutlinedButtonWithMarginComponent,
  }

  const ButtonComponent: React.ComponentType = buttonComponents[buttonType]

  return (
    <SectionComponent backgroundColor={backgroundColor}>
      <SizeContainer>
        <ContentContainer className="Container" textPosition={textPosition}>
          <TextContainer textPosition={textPosition}>
            <TitleComponent titleColor={titleColor}>{title}</TitleComponent>
            <ParagraphComponent
              paragraphColor={paragraphColor}
              dangerouslySetInnerHTML={{
                __html: paragraph.html,
              }}
            />
            {showButton && <ButtonComponent>{buttonText}</ButtonComponent>}
          </TextContainer>
          {textPosition !== 'center' && <ImageComponent src={image} />}
        </ContentContainer>
      </SizeContainer>
    </SectionComponent>
  )
}
