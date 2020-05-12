import styled from '@emotion/styled'
import React from 'react'
import { ButtonLinkBrandPivot } from '../ButtonBrandPivot/Button'
import { AppStore } from './svg/AppStore'
import { PlayStore } from './svg/PlayStore'

const BP_UP = '@media (min-width: 375px)'

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const AppButton = styled(ButtonLinkBrandPivot)`
  display: inline-flex;
  justify-content: center;
  width: calc(50% - 0.5rem);
  padding: 0.625rem 1rem;

  &:first-of-type {
    margin-right: 0.5rem;
  }

  &:last-of-type {
    margin-left: 0.5rem;
  }

  & > svg {
    width: 108px;
    height: 26px;
  }

  ${BP_UP} {
    padding: 0.625rem 1.625rem;

    & > svg {
      width: 99px;
      height: 25px;
    }
  }
`
interface AppButtonsProps {
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
