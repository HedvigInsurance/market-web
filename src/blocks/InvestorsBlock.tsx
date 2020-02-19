import styled from '@emotion/styled'
import { fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import { ContentWrapper, SectionWrapper } from '../components/blockHelpers'
import { DeferredImage } from '../components/DeferredImage'
import { getStoryblokImage, Image } from '../utils/storyblok'
import { BaseBlockProps } from './BaseBlockProps'

interface Investor {
  _uid: string
  image: Image
  name: string
  type: string
}

interface InvestorsBlockProps extends BaseBlockProps {
  title: string
  items: ReadonlyArray<Investor>
}

const MEDIA_QUERY = '@media (max-width: 650px)'

const InnerWrapper = styled('div')({
  maxWidth: '45rem',
  margin: 'auto',
})

const Title = styled('h3')({
  fontSize: 60,
  lineHeight: '65px',
  marginBottom: 50,
  marginTop: 0,
  textAlign: 'center',
  [MEDIA_QUERY]: {
    fontSize: 45,
    lineHeight: '50px',
  },
})

const InvestorList = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [MEDIA_QUERY]: {
    flexDirection: 'column',
  },
})

const InvestorContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [MEDIA_QUERY]: {
    marginBottom: 30,
  },
})

const InvestorImage = styled(DeferredImage)({
  width: '110px',
  height: '110px',
  objectFit: 'cover',
  borderRadius: 5,
})

const InvestorName = styled('span')({
  fontFamily: fonts.GEOMANIST,
  fontSize: 18,
  lineHeight: '19px',
  marginTop: 15,
})

const InvestorType = styled('span')({
  fontSize: 15,
  lineHeight: '16px',
  marginTop: 5,
})

export const InvestorsBlock: React.FunctionComponent<InvestorsBlockProps> = ({
  color,
  title,
  items,
  size,
  index,
}) => (
  <SectionWrapper color={color && color.color} size={size}>
    <ContentWrapper index={index}>
      <InnerWrapper>
        <Title>{title}</Title>
        <InvestorList>
          {items.map(({ _uid, name, image, type }) => (
            <InvestorContainer key={_uid}>
              <InvestorImage src={getStoryblokImage(image)} />
              <InvestorName>{name}</InvestorName>
              <InvestorType>{type}</InvestorType>
            </InvestorContainer>
          ))}
        </InvestorList>
      </InnerWrapper>
    </ContentWrapper>
  </SectionWrapper>
)
