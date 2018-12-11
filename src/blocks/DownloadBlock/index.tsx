import { fonts } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'

import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  SectionWrapper,
  TABLET_BP_UP,
} from '../../components/blockHelpers'
import { BaseBlockProps } from '../BaseBlockProps'
import { AppLinkForm } from './AppLinkForm'
import { RotatingPhoneVideo } from './RotatingPhoneVideo'

const VIDEO_BG_COLOR = 'rgb(249, 251, 252)'

const Section = styled(SectionWrapper)({
  background: VIDEO_BG_COLOR,
})

const InnerContentWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column-reverse',
  width: '100%',
  [TABLET_BP_UP]: {
    flexDirection: 'row',
  },
})

const Column = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  [TABLET_BP_UP]: {
    width: '50%',
  },
})

const Heading = styled('h1')({
  textAlign: 'center',
  fontFamily: fonts.SORAY,
  fontSize: '2.5rem',
  [TABLET_BP_UP]: {
    fontSize: '3rem',
  },
})

const SpacedAppLinkForm = styled(AppLinkForm)({
  width: '100%',
  marginTop: '4rem',
  textAlign: 'left',
  [MOBILE_BP_DOWN]: {
    marginTop: '1rem',
  },
})

interface DownloadBlockProps extends BaseBlockProps {
  title: string
  phone_number_placeholder: string
  cta_text: string
  error_text: string
  success_text: string
}

export const DownloadBlock: React.FunctionComponent<DownloadBlockProps> = ({
  title,
  phone_number_placeholder,
  cta_text,
  error_text,
  success_text,
}) => (
  <Section>
    <ContentWrapper>
      <InnerContentWrapper>
        <Column>
          <RotatingPhoneVideo />
        </Column>
        <Column>
          <Heading>{title}</Heading>
          <SpacedAppLinkForm
            phoneNumberPlaceholder={phone_number_placeholder}
            ctaText={cta_text}
            errorText={error_text}
            successText={success_text}
          />
        </Column>
      </InnerContentWrapper>
    </ContentWrapper>
  </Section>
)
