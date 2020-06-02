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
import { ButtonLinkBrandPivot } from 'components/ButtonBrandPivot/Button'
import React from 'react'

const StyledSectionWrapper = styled(SectionWrapper)`
  color: ${colorsV3.gray900};
  padding: 4rem 0;

  ${TABLET_BP_UP} {
    padding: 7rem 0 4rem;
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

interface InsuranceInfoBlockProps extends BrandPivotBaseBlockProps {
  value_1_description: string
  value_1_value: string
  value_2_description: string
  value_2_value: string
  value_3_description: string
  value_3_value: string
  value_4_description: string
  value_4_value: string
  value_5_description: string
  value_5_value: string
  value_6_description: string
  value_6_value: string
  value_7_description: string
  value_7_value: string
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
        {values.value_1_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_1_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_1_value}</InsuranceValue>
          </Column>
        )}
        {values.value_2_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_2_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_2_value}</InsuranceValue>
          </Column>
        )}
        {values.value_3_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_3_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_3_value}</InsuranceValue>
          </Column>
        )}
        {values.value_4_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_4_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_4_value}</InsuranceValue>
          </Column>
        )}
        {values.value_5_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_5_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_5_value}</InsuranceValue>
          </Column>
        )}
        {values.value_6_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_6_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_6_value}</InsuranceValue>
          </Column>
        )}
        {values.value_7_value && (
          <Column>
            <InsuranceValueDescription>
              {values.value_7_description}
            </InsuranceValueDescription>
            <InsuranceValue>{values.value_7_value}</InsuranceValue>
          </Column>
        )}

        <Column lastOnMobile hardBottom>
          {values.terms_link_text && (
            <Link
              href={values.terms_link}
              target="_blank"
              rel="noopener nofollow"
            >
              {values.terms_link_text}↗
            </Link>
          )}
          {values.presale_info_link_text && (
            <Link
              href={values.presale_info_link}
              target="_blank"
              rel="noopener nofollow"
            >
              {values.presale_info_link_text}↗
            </Link>
          )}
        </Column>

        {values.cta_link && (
          <Column halfHardBottom>
            <ButtonLinkBrandPivot
              href={values.cta_link}
              fullWidth
              styleType="outlined"
            >
              {values.cta_text}
            </ButtonLinkBrandPivot>
          </Column>
        )}
      </StyledContentWrapper>
    </StyledSectionWrapper>
  )
}
