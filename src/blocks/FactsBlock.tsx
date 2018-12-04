import { colors, fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

const FactsContainer = styled('div')({
  backgroundColor: '#FFF3F2',
  padding: '70px 20px',
  color: colors.BLACK_PURPLE,
})

const MEDIA_QUERY_WIDTH = '650px'
const MEDIA_QUERY = `@media (min-width: ${MEDIA_QUERY_WIDTH})`

const Title = styled('h3')({
  fontSize: 45,
  lineHeight: '50px',
  textAlign: 'center',
  fontFamily: fonts.SORAY,
  [MEDIA_QUERY]: {
    fontSize: 60,
    lineHeight: '65px',
  },
})

const Grid = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  maxWidth: 700,
  margin: '0 auto',
  flexDirection: 'column',
  [MEDIA_QUERY]: {
    flexDirection: 'row',
  },
})

const Fact = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 40,
})

const FactNumber = styled('span')({
  fontSize: 70,
  lineHeight: '75px',
  fontFamily: fonts.SORAY,
  [MEDIA_QUERY]: {
    fontSize: 90,
    lineHeight: '95px',
  },
})

const FactExplainer = styled('span')({
  fontSize: 14,
  lineHeight: '15px',
  textAlign: 'center',
  marginTop: 0,
  [MEDIA_QUERY]: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: '19px',
  },
})

interface FactsBlockProps {
  title: string
  fact1_number: string
  fact1_explainer: string
  fact2_number: string
  fact2_explainer: string
  fact3_number: string
  fact3_explainer: string
}

export const FactsBlock: React.FunctionComponent<FactsBlockProps> = ({
  title,
  fact1_number,
  fact1_explainer,
  fact2_number,
  fact2_explainer,
  fact3_number,
  fact3_explainer,
}) => (
  <FactsContainer>
    <Title>{title}</Title>
    <Grid>
      <Fact>
        <FactNumber>{fact1_number}</FactNumber>
        <FactExplainer>{fact1_explainer}</FactExplainer>
      </Fact>
      <Fact>
        <FactNumber>{fact2_number}</FactNumber>
        <FactExplainer>{fact2_explainer}</FactExplainer>
      </Fact>
      <Fact>
        <FactNumber>{fact3_number}</FactNumber>
        <FactExplainer>{fact3_explainer}</FactExplainer>
      </Fact>
    </Grid>
  </FactsContainer>
)
