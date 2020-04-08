import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MOBILE_BP_UP, SITE_MAX_WIDTH } from 'components/blockHelpers'
import { Chat } from 'components/icons/Chat'
import { Globe } from 'components/icons/Globe'
import React from 'react'
import { TABLET_BP_UP } from './mobile'

interface HeaderTopProps {
  transparent: boolean
}

const Wrapper = styled.div<{ transparent: boolean }>`
  position: absolute;
  width: 100%;
  height: 2.5rem;
  padding-top: 1px;
  font-size: 0.875rem;
  color: ${(props) => (props.transparent ? 'inherit' : colorsV3.gray100)};
  background-color: ${(props) =>
    props.transparent ? 'transparent' : colorsV3.gray900};
  border-bottom: 1px solid
    ${(props) => (props.transparent ? colorsV3.gray700 : colorsV3.gray900)};
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem;
  margin-left: auto;
  margin-right: auto;
  ${SITE_MAX_WIDTH}

  ${MOBILE_BP_UP} {
    padding: 0 2rem;
  }

  ${TABLET_BP_UP} {
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
`

const ContactLink = styled.a`
  display: flex;
  align-items: center;

  ${TABLET_BP_UP} {
    margin-right: 4rem;
  }

  svg {
    margin-right: 0.5rem;
  }
`

const MarketPicker = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`

export const HeaderTop: React.FC<HeaderTopProps> = ({ transparent }) => {
  return (
    <Wrapper transparent={transparent}>
      <Content>
        <MarketPicker>
          <Globe size="1.5rem" /> <span>Sv/Se</span>
        </MarketPicker>
        <ContactLink>
          <Chat size="1.5rem" />
          Kontakt
        </ContactLink>
      </Content>
    </Wrapper>
  )
}
