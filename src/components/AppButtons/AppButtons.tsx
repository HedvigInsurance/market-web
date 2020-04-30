import React from 'react'
import styled from '@emotion/styled'
import { ButtonLinkBrandPivot } from '../ButtonBrandPivot/Button'
import { AppStore } from './svg/AppStore'
import { PlayStore } from './svg/PlayStore'
import { TABLET_BP_UP } from '../blockHelpers'

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${TABLET_BP_UP} {
    flex-direction: row;
  }
`

const AppButton = styled(ButtonLinkBrandPivot)`
  display: inline-flex;
  padding: 0.625rem 1.625rem;

  &:first-of-type {
    margin-bottom: 1rem;
  }

  & > svg {
    width: 108px;
    height: 26px;
  }

  ${TABLET_BP_UP} {
    &:first-of-type {
      margin-bottom: 0;
      margin-right: 0.5rem;
    }

    &:last-of-type {
      margin-left: 0.5rem;
    }

    & > svg {
      width: 99px;
      height: 25px;
    }
  }
`
type AppButtonsProps = {
  color?: 'standard' | 'standard-inverse'
}

export const AppButtons: React.FC<AppButtonsProps> = ({
  color = 'standard-inverse',
}) => {
  return (
    <ButtonsWrapper>
      <AppButton
        color={color}
        styleType="outlined"
        size="sm"
        href="https://play.google.com/store/apps/details?id=com.hedvig.app"
      >
        <PlayStore />
      </AppButton>
      <AppButton
        color={color}
        styleType="outlined"
        size="sm"
        href="https://apps.apple.com/app/hedvig/id1303668531"
      >
        <AppStore />
      </AppButton>
    </ButtonsWrapper>
  )
}
