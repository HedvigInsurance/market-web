import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import {
  LAPTOP_BP_UP,
  MOBILE_BP_UP,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { PerilIcon } from 'components/Perils/types'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { useIcon } from '../data/useIcon'

interface PerilItemProps {
  title: React.ReactNode
  color: minimalColorComponentColors
  disabled?: boolean
  icon: PerilIcon
  onClick: () => void
}

const OuterContainer = styled.div`
  position: relative;
  display: flex;
  color: ${colorsV3.gray900};

  &:before {
    content: '';

    ${TABLET_BP_UP} {
      position: relative;
      padding-top: 75%;
    }

    ${LAPTOP_BP_UP} {
      padding-top: 100%;
    }
  }
`

const InnerContainer = styled.button<{
  color: minimalColorComponentColors
}>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  min-height: 3.75rem;
  padding: 0.5rem 1rem 0.5rem 0.375rem;
  color: inherit;
  font-family: inherit;
  border-radius: 0.375rem;
  background-color: ${colorsV3.white};
  border: 0;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 150ms ease-in-out;
  appearance: none;

  &:disabled {
    color: ${colorsV3.gray500};
    background-color: ${colorsV3.gray100};
    border: 1px solid ${colorsV3.gray300};
    cursor: initial;

    svg * {
      fill: currentColor;
    }
  }

  ${TABLET_BP_UP} {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1.25rem;
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    &:not([disabled]):hover {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  &:focus {
    outline: none;
  }

  &:not([disabled]):active {
    background-color: ${colorsV3.gray300};
    box-shadow: none;
  }
`

const IconWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  margin-right: 0.375rem;
  flex-shrink: 0;

  ${MOBILE_BP_UP} {
    width: 2.5rem;
    height: 2.5rem;
  }

  ${TABLET_BP_UP} {
    width: 3rem;
    height: 3rem;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`

const Title = styled('h4')`
  margin: 0;
  font-size: 0.875rem;

  ${TABLET_BP_UP} {
    font-size: 1rem;
  }
`

export const PerilItem: React.FC<PerilItemProps> = ({
  title,
  color,
  disabled,
  icon,
  onClick,
}) => {
  const iconUrl: string = icon.variants.light.svgUrl
  const iconString = useIcon(iconUrl)

  return (
    <OuterContainer>
      <InnerContainer color={color} disabled={disabled} onClick={onClick}>
        <IconWrapper dangerouslySetInnerHTML={{ __html: iconString }} />
        <Title>{title}</Title>
      </InnerContainer>
    </OuterContainer>
  )
}
