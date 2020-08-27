import styled from '@emotion/styled'
import {
  BrandPivotBaseBlockProps,
  MarkdownHtmlComponent,
} from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  SectionWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { PlusBrandPivot } from 'components/icons/PlusBrandPivot'
import { Container } from 'constate'
import React from 'react'
import AnimateHeight from 'react-animate-height'

interface AccordionProps {
  _uid: string
  title: string
  paragraph: MarkdownHtmlComponent
}

interface Openable {
  isOpen: boolean
}

const AccordionsWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
})

const AccordionsList = styled('ul')({
  listStyle: 'none',
  maxWidth: '40rem',
  width: '100%',
  padding: 0,
  margin: 0,
})

const AccordionsTitle = styled('h3')({
  marginBottom: '5rem',
  fontSize: '2rem',
  textAlign: 'center',
  lineHeight: 1.2,

  [TABLET_BP_UP]: {
    marginBottom: '6.25rem',
    fontSize: '3rem',
  },
})

const AccordionItem = styled('li')({
  width: '100%',
  margin: 0,
  pading: 0,
})

const AccordionTitle = styled('h4')({
  margin: 0,
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontSize: '1.125rem',
  lineHeight: 1.4,
  borderBottom: '1px solid currentColor',

  [TABLET_BP_UP]: {
    paddingTop: '1.5rem',
    paddingBottom: '1.5rem',
    fontSize: '1.5rem',
  },
})

const ExpandToggler = styled('button')({
  appearance: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  textAlign: 'inherit',
  lineHeight: 'inherit',
  width: '100%',
  fontSize: 'inherit',
  background: 'transparent',
  border: 'none',
  fontWeight: 'inherit',
  fontFamily: 'inherit',
  padding: 0,
  color: 'inherit',
  cursor: 'pointer',

  '&:focus': {
    outline: 'none',
  },
})

const AccordionTitleContent = styled('span')({
  paddingRight: '1rem',
  textAlign: 'left',
})

const AccordionContent = styled('div')({
  overflowY: 'hidden',

  [TABLET_BP_UP]: {
    padding: '3rem 3rem 1.5rem 3rem',
    '& p': {
      marginTop: 0,
      marginBottom: '1rem',
    },
    '& p:last-child': {
      margin: 0,
    },
  },
})

const ExpanderWrapper = styled('div')({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: '1.625rem',
  height: '1.625rem',

  [TABLET_BP_UP]: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.375rem',
  },
})

const ExpanderIcon = styled(PlusBrandPivot)<Openable>(({ isOpen }) => ({
  transform: isOpen ? 'rotate(45deg)' : undefined,
  transition: 'transform 150ms',
  width: '15px',
  height: '15px',

  [TABLET_BP_UP]: {
    width: '25px',
    height: '25px',
  },
}))

export const Accordion: React.FC<AccordionProps> = ({ title, paragraph }) => (
  <Container<Openable, { toggleIsOpen: () => Openable }>
    initialState={{ isOpen: false }}
    actions={{ toggleIsOpen: () => ({ isOpen }) => ({ isOpen: !isOpen }) }}
  >
    {({ isOpen, toggleIsOpen }) => (
      <AccordionItem>
        <AccordionTitle>
          <ExpandToggler onClick={toggleIsOpen}>
            <AccordionTitleContent>{title}</AccordionTitleContent>
            <ExpanderWrapper>
              <ExpanderIcon isOpen={isOpen} />
            </ExpanderWrapper>
          </ExpandToggler>
        </AccordionTitle>
        <AnimateHeight height={isOpen ? 'auto' : 0}>
          <AccordionContent
            dangerouslySetInnerHTML={{ __html: paragraph?.html }}
          />
        </AnimateHeight>
      </AccordionItem>
    )}
  </Container>
)

export interface AccordionBlockProps extends BrandPivotBaseBlockProps {
  title: string
  accordions: ReadonlyArray<AccordionProps>
}

export const AccordionBlock: React.FunctionComponent<AccordionBlockProps> = ({
  accordions,
  color,
  extra_styling,
  index,
  size,
  title,
}) => (
  <SectionWrapper
    brandPivot
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  >
    <ContentWrapper brandPivot index={index}>
      <AccordionsTitle>{title}</AccordionsTitle>
      <AccordionsWrapper>
        {accordions && accordions.length > 0 && (
          <AccordionsList>
            {accordions.map((accordion) => (
              <Accordion key={accordion._uid} {...accordion} />
            ))}
          </AccordionsList>
        )}
      </AccordionsWrapper>
    </ContentWrapper>
  </SectionWrapper>
)
