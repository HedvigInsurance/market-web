import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import {
  LAPTOP_BP_UP,
  MOBILE_BP_UP,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { PerilIcon } from 'components/Perils/types'
import React from 'react'
import { minimalColorComponentColors } from 'src/blocks/BaseBlockProps'
import { useIcon } from '../data/useIcon'

interface PerilItemProps {
  title: React.ReactNode
  color: minimalColorComponentColors
  icon: PerilIcon
  onClick: () => void
}

const OuterContainer = styled.div`
  color: ${colorsV3.gray900};
`

const MiddleContainer = styled.button`
  display: flex;
  width: 100%;
  background: transparent;
  border: 0;

  ${TABLET_BP_UP} {
    position: relative;
    padding-top: 75%;
  }

  ${LAPTOP_BP_UP} {
    padding-top: 100%;
  }
`

const InnerContainer = styled.div<{ color: minimalColorComponentColors }>`
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
  background-color: ${({ color }) =>
    color === 'standard-inverse' ? colorsV3.gray100 : colorsV3.white};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  appearance: none;

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

    &:hover {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: ${colorsV3.gray300};
    box-shadow: none;
  }
`

const IconWrapper = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  margin-right: 0.375rem;

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
    ${TABLET_BP_UP} {
      transform: translateX(-0.625rem);
    }

    path {
      fill: currentColor;
    }
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
  icon,
  onClick,
}) => {
  const iconUrl: string = icon.variants.light.svgUrl
  const iconString = useIcon(iconUrl)

  return (
    <OuterContainer>
      <MiddleContainer>
        <InnerContainer color={color} onClick={onClick}>
          <IconWrapper dangerouslySetInnerHTML={{ __html: iconString }} />
          <Title>{title}</Title>
        </InnerContainer>
      </MiddleContainer>
    </OuterContainer>
  )
}
