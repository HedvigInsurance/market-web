import { Container } from 'constate'
import * as React from 'react'
import AnimateHeight from 'react-animate-height'
import styled from 'react-emotion'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { Plus } from '../components/icons/Plus'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'
import { SectionSize } from '../utils/SectionSize'

const SplitContentWrapper = styled(ContentWrapper)({
  display: 'flex',
  flexDirection: 'row',
  [TABLET_BP_DOWN]: {
    flexDirection: 'column',
  },
})

const Col = styled('div')({
  width: '50%',
  [TABLET_BP_DOWN]: {
    width: '100%',
  },
})

const AccordionsWrapper = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
})
const AccordionWrapper = styled('li')({
  padding: 0,
  margin: 0,
})

const AccordionTitle = styled('h3')({
  fontSize: '1.25rem',
})

const ExpandToggler = styled('button')({
  appearance: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'inherit',
  lineHeight: 'inherit',
  fontSize: 'inherit',
  background: 'transparent',
  border: 'none',
  fontWeight: 'inherit',
  fontFamily: 'inherit',
  padding: 0,
  color: 'inherit',
  cursor: 'pointer',

  [MOBILE_BP_DOWN]: {
    width: '100%',
    justifyContent: 'space-between',
  },

  '&:focus': {
    outline: 'none',
  },
})

const AccordionTitleContent = styled('span')({
  paddingRight: '1rem',
})

const AccordionContent = styled('div')({
  overflowY: 'hidden',
})

const ExpanderIcon = styled(Plus)(({ isOpen }: { isOpen: boolean }) => ({
  transform: isOpen ? 'rotate(45deg)' : undefined,
  transition: 'transform 150ms',
  flexShrink: 0,
}))

interface AccordionProps {
  _uid: string
  title: string
  paragraph: MarkdownHtmlComponent
}

export const Accordion: React.FunctionComponent<AccordionProps> = ({
  title,
  paragraph,
}) => (
  <Container<{ isOpen: boolean }, { toggleIsOpen: () => { isOpen: boolean } }>
    initialState={{ isOpen: false }}
    actions={{ toggleIsOpen: () => ({ isOpen }) => ({ isOpen: !isOpen }) }}
  >
    {({ isOpen, toggleIsOpen }) => (
      <AccordionWrapper>
        <AccordionTitle>
          <ExpandToggler onClick={toggleIsOpen}>
            <AccordionTitleContent>{title}</AccordionTitleContent>
            <ExpanderIcon size=".8em" isOpen={isOpen} />
          </ExpandToggler>
        </AccordionTitle>
        <AnimateHeight height={isOpen ? 'auto' : 0}>
          <AccordionContent
            dangerouslySetInnerHTML={{ __html: paragraph && paragraph.html }}
          />
        </AnimateHeight>
      </AccordionWrapper>
    )}
  </Container>
)

interface AccordionBlockProps extends BaseBlockProps {
  size: SectionSize
  title: string
  accordions: ReadonlyArray<AccordionProps>
}

export const AccordionBlock: React.FunctionComponent<AccordionBlockProps> = ({
  size,
  title,
  accordions,
  color,
}) => (
  <SectionWrapper color={color && color.color} size={size}>
    <SplitContentWrapper>
      <Col>
        <h2>{title}</h2>
      </Col>
      <Col>
        {accordions && accordions.length > 0 && (
          <AccordionsWrapper>
            {accordions.map((accordion) => (
              <Accordion key={accordion._uid} {...accordion} />
            ))}
          </AccordionsWrapper>
        )}
      </Col>
    </SplitContentWrapper>
  </SectionWrapper>
)
