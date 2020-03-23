import styled from '@emotion/styled'
import { Container } from 'constate'
import React from 'react'
import AnimateHeight from 'react-animate-height'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_DOWN,
} from '../components/blockHelpers'
import { Plus } from '../components/icons/Plus'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

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

interface Openable {
  isOpen: boolean
}

const ExpanderIcon = styled(Plus)<Openable>(({ isOpen }) => ({
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
  <Container<Openable, { toggleIsOpen: () => Openable }>
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
  title: string
  accordions: ReadonlyArray<AccordionProps>
}

export const AccordionBlock: React.FunctionComponent<AccordionBlockProps> = ({
  extra_styling,
  color,
  size,
  title,
  accordions,
  index,
}) => (
  <SectionWrapper
    colorComponent={color}
    size={size}
    extraStyling={extra_styling}
  >
    <SplitContentWrapper index={index}>
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
