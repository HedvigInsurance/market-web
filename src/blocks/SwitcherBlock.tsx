import { colors } from '@hedviginsurance/brand'
import Animated from 'animated'
import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { Mount, Unmount } from 'react-lifecycle-components'
import Measure from 'react-measure'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { BaseBlockProps, MarkdownHtmlComponent } from './BaseBlockProps'

interface SwitcherBlockProps extends BaseBlockProps {
  title: string
  paragraph: MarkdownHtmlComponent
}

interface BarProps {
  color: string
}

const AnimatedDiv = Animated.createAnimatedComponent('div')

const Table = styled('div')({
  position: 'relative',
  display: 'table',
  width: '100%',
})

const BackgroundImage = styled(DeferredImage)({
  objectFit: 'cover',
  position: 'absolute',
  width: '82%',
  height: '100%',
  left: '5%',
  top: '-7%',
  bottom: 0,
  zIndex: -1,
  '@media (max-width: 600px)': {
    left: '10%',
    height: '75%',
    width: 'auto',
  },
})

const TableRow = styled('div')({
  display: 'table-row',
  '@media (max-width: 600px)': {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
})

const TableCellName = styled('div')(({ isLast }: { isLast: boolean }) => ({
  display: 'table-cell',
  paddingRight: 25,
  paddingBottom: isLast ? 0 : 30,
}))

const TableCellBar = styled(AnimatedDiv)({
  display: 'table-cell',
  width: '100%',
  position: 'relative',
  '@media (max-width: 600px)': {
    height: '1.25rem',
  },
})

const BarContainer = styled('div')({
  overflow: 'hidden',
  height: 12,
  borderRadius: 10,
  width: '100%',
  position: 'relative',
  backfaceVisibility: 'hidden',
  transform: 'translate3d(0, 0, 0)',
})

const HeadlineSection = styled('div')({
  textAlign: 'center',
  display: 'inline',
})

const Headline = styled('h2')({
  marginTop: 0,
  paddingBottom: '2rem',
})

const Paragraph = styled('div')({
  fontSize: '1.125rem',
  lineHeight: '1.25rem',
  paddingBottom: 60,
})

const PercentageText = styled(AnimatedDiv)({
  fontSize: '1rem',
  color: colors.DARK_GRAY,
  textAlign: 'right',
  display: 'inline-block',
  position: 'absolute',
  left: 50,
  top: -6,
  willChange: 'transform',
  '@media (max-width: 600px)': {
    fontSize: 16,
  },
})

const Section = styled(SectionWrapper)({
  '@media (max-width: 600px)': {
    overflow: 'hidden',
    paddingTop: 60,
  },
})

const CompanyName = styled('div')({
  fontSize: 18,
  fontWeight: 'bold',
  lineHeight: 1,
  '@media (max-width: 600px)': {
    fontSize: 16,
  },
})

const BarsContainer = styled('div')({
  width: '100%',
})

const Bar = styled(AnimatedDiv)((props: BarProps) => ({
  backgroundColor: props.color,
  height: 12,
  display: 'inline-block',
  borderRadius: 10,
  transformOrigin: 'top left',
  willChange: 'transform',
  position: 'absolute',
  left: 0,
  top: 0,
}))

const COMPANIES = [
  {
    name: 'Länsförsäkringar',
    percent: 29,
    color: colors.BLACK_PURPLE,
  },
  {
    name: 'If',
    percent: 25,
    color: colors.PURPLE,
  },
  {
    name: 'TryggHansa',
    percent: 18,
    color: colors.PINK,
  },
  {
    name: 'Folksam',
    percent: 11,
    color: colors.GREEN,
  },
  {
    name: 'Övrigt',
    percent: 17,
    color: colors.DARK_GRAY,
  },
]

const MAX_WEIGHT = 29

interface GetStyle {
  animatedValue: any
  offsetTop: number
  offset: number
  percent: number
}

const getWindowInnerHeight = () => {
  if (typeof window !== 'undefined') {
    return window.innerHeight
  }

  return 0
}

const getSectionPosition = ({ offsetTop }: { offsetTop: number }) =>
  offsetTop - getWindowInnerHeight()

const getBarWidth = ({ percent }: { percent: number }) =>
  `calc(${(100 / MAX_WEIGHT) * percent}% - 50px)`

const getInputRange = ({
  offsetTop,
  offset,
}: {
  offsetTop: number
  offset: number
}) => {
  const sectionPosition = getSectionPosition({ offsetTop })

  return [sectionPosition + offset, sectionPosition + offset * 2]
}

const getTableCellStyle = ({
  animatedValue,
  offsetTop = 0,
  offset,
}: GetStyle) => {
  const opacity = animatedValue.interpolate({
    inputRange: getInputRange({ offsetTop, offset }),
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  return {
    opacity,
  }
}

const getBarStyle = ({
  animatedValue,
  offsetTop = 0,
  offset,
  percent,
}: GetStyle) => {
  const transform = animatedValue.interpolate({
    inputRange: getInputRange({ offsetTop, offset }),
    outputRange: ['translateX(-100%)', `translateX(0%)`],
    extrapolate: 'clamp',
  })

  return {
    width: getBarWidth({ percent }),
    transform,
  }
}

const getPercentageTextStyle = ({
  animatedValue,
  offsetTop = 0,
  offset,
  percent,
}: GetStyle) => {
  const transform = animatedValue.interpolate({
    inputRange: getInputRange({ offsetTop, offset }),
    outputRange: [`translateX(-100%)`, `translateX(0%)`],
    extrapolate: 'clamp',
  })

  return {
    transform,
    width: getBarWidth({ percent }),
  }
}

interface State {
  animatedValue: any
  eventHandler: (...args: any[]) => void
  isMounted: boolean
}

const getInitialState: () => State = () => {
  const animatedValue = new Animated.Value(0)

  return {
    animatedValue,
    eventHandler: Animated.event([
      { target: { scrollingElement: { scrollTop: animatedValue } } },
    ]),
    isMounted: false,
  }
}

export const SwitcherBlock: React.FunctionComponent<SwitcherBlockProps> = ({
  color,
  title,
  paragraph,
}) => (
  <Container<State, { setMounted: () => void }>
    initialState={getInitialState()}
    actions={{ setMounted: () => () => ({ isMounted: true }) }}
  >
    {({ animatedValue, eventHandler, isMounted, setMounted }) => (
      <Unmount on={() => window.removeEventListener('scroll', eventHandler)}>
        <Mount
          on={() => {
            window.addEventListener('scroll', eventHandler, {
              passive: true,
            })
            setMounted()
          }}
        >
          <Measure offset bounds>
            {({ measureRef, contentRect }) => (
              <Section color={color && color.color}>
                <ContentWrapper>
                  <HeadlineSection>
                    <Headline>{title}</Headline>
                    <Paragraph
                      dangerouslySetInnerHTML={{
                        __html: paragraph && paragraph.html,
                      }}
                    />
                  </HeadlineSection>
                  <Table innerRef={measureRef}>
                    <BackgroundImage src="/assets-next/backgrounds/mesh@2x.png" />
                    <BarsContainer>
                      {COMPANIES.map((company, index) => (
                        <TableRow key={company.name}>
                          <TableCellName
                            isLast={index === COMPANIES.length - 1}
                          >
                            <CompanyName>{company.name}</CompanyName>
                          </TableCellName>
                          <TableCellBar
                            style={
                              !isMounted
                                ? {}
                                : getTableCellStyle({
                                    animatedValue,
                                    offsetTop:
                                      (contentRect.offset &&
                                        contentRect.offset.top) ||
                                      0,
                                    offset: index * 35 + 100,
                                    percent: company.percent,
                                  })
                            }
                          >
                            <BarContainer>
                              <Bar
                                color={company.color}
                                style={
                                  !isMounted
                                    ? {}
                                    : getBarStyle({
                                        animatedValue,
                                        offsetTop:
                                          (contentRect.offset &&
                                            contentRect.offset.top) ||
                                          0,
                                        offset: index * 35 + 100,
                                        percent: company.percent,
                                      })
                                }
                              />
                            </BarContainer>
                            <PercentageText
                              style={
                                !isMounted
                                  ? {}
                                  : getPercentageTextStyle({
                                      animatedValue,
                                      offsetTop:
                                        (contentRect.offset &&
                                          contentRect.offset.top) ||
                                        0,
                                      offset: index * 35 + 100,
                                      percent: company.percent,
                                    })
                              }
                            >{`${company.percent}%`}</PercentageText>
                          </TableCellBar>
                        </TableRow>
                      ))}
                    </BarsContainer>
                  </Table>
                </ContentWrapper>
              </Section>
            )}
          </Measure>
        </Mount>
      </Unmount>
    )}
  </Container>
)
