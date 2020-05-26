import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { BrandPivotBaseBlockProps } from 'blocks/BaseBlockProps'
import {
  ContentWrapper,
  LAPTOP_BP_UP,
  SectionWrapper,
  TABLET_BP_DOWN,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import React from 'react'

const StyledSectionWrapper = styled(SectionWrapper)`
  color: ${colorsV3.gray900};
  padding: 4rem 0;

  ${TABLET_BP_UP} {
    padding: 7rem 0;
  }
`

const StyledContentWrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  & {
    max-width: calc(49rem + 2 * 2rem);
  }
`

const Column = styled.div<{
  hardBottom?: boolean
  halfHardBottom?: boolean
  lastOnMobile?: boolean
}>`
  width: 100%;

  ${TABLET_BP_DOWN} {
    ${({ lastOnMobile }) =>
      lastOnMobile &&
      css`
        order: 999;
      `};
  }

  ${TABLET_BP_UP} {
    width: calc(100% / 2);
  }

  ${LAPTOP_BP_UP} {
    width: calc(100% / 3);
  }

  padding-bottom: 3rem;
  ${({ hardBottom }) =>
    hardBottom &&
    css`
      padding-bottom: 0;
    `};
  ${({ halfHardBottom }) =>
    halfHardBottom &&
    css`
      padding-bottom: 1.5rem;
    `};
`

const InsuranceValueDescription = styled.div`
  color: ${colorsV3.gray700};
`
const InsuranceValue = styled.div`
  font-size: 1.5rem;
`

const Link = styled.a`
  display: block;
  line-height: 1.75;
  color: inherit;
  text-decoration: none;

  &:hover,
  &:focus {
    color: inherit;
    text-decoration: underline;
  }
`

const Cta = styled.a`
  display: inline-block;
  border: 1px solid ${colorsV3.gray900};
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  width: 100%;
  color: inherit;
  text-decoration: none;
  text-align: center;
`

interface InsuranceInfoBlockProps extends BrandPivotBaseBlockProps {
  value_1_description: string
  value_1_value: string
  value_2_description: string
  value_2_value: string
  value_3_description: string
  value_3_value: string
  value_4_description: string
  value_4_value: string
  terms_link: string
  terms_link_text: string
  presale_info_link: string
  presale_info_link_text: string
  cta_text: string
  cta_link: string
}

export const InsuranceInfoBlock: React.FC<InsuranceInfoBlockProps> = ({
  color,
  index,
  extra_styling,
  ...values
}) => {
  return (
    <StyledSectionWrapper
      extraStyling={extra_styling}
      colorComponent={color}
      brandPivot
    >
      <StyledContentWrapper index={index}>
        <Column>
          <InsuranceValueDescription>
            {values.value_1_description}
          </InsuranceValueDescription>
          <InsuranceValue>{values.value_1_value}</InsuranceValue>
        </Column>
        <Column>
          <InsuranceValueDescription>
            {values.value_2_description}
          </InsuranceValueDescription>
          <InsuranceValue>{values.value_2_value}</InsuranceValue>
        </Column>
        <Column>
          <InsuranceValueDescription>
            {values.value_3_description}
          </InsuranceValueDescription>
          <InsuranceValue>{values.value_3_value}</InsuranceValue>
        </Column>
        <Column>
          <InsuranceValueDescription>
            {values.value_4_description}
          </InsuranceValueDescription>
          <InsuranceValue>{values.value_4_value}</InsuranceValue>
        </Column>

        <Column lastOnMobile hardBottom>
          <Link
            href={values.terms_link}
            target="_blank"
            rel="noopener nofollow"
          >
            {values.terms_link_text}↗
          </Link>
          <Link
            href={values.presale_info_link}
            target="_blank"
            rel="noopener nofollow"
          >
            {values.presale_info_link_text}↗
          </Link>
        </Column>

        <Column halfHardBottom>
          <Cta href={values.cta_link}>{values.cta_text}</Cta>
        </Column>
      </StyledContentWrapper>
    </StyledSectionWrapper>
  )
}
