import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import { MOBILE_BP_UP, TABLET_BP_UP } from 'components/blockHelpers'
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

const Container = styled.button<{ color: minimalColorComponentColors }>`
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
  border: 0;
  background-color: ${({ color }) =>
    color === 'standard-inverse' ? colorsV3.gray100 : colorsV3.white};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  appearance: none;

  ${TABLET_BP_UP} {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.25rem;
    border-radius: 0.5rem;

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
    margin-bottom: 4.75rem;
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

export const Description = styled.p`
  display: none;

  ${TABLET_BP_UP} {
    display: block;
    margin-top: 0;
    font-size: 0.875rem;
    text-align: left;
    line-height: 1.45;
    color: ${colorsV3.gray700};
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
      <Container color={color} onClick={onClick}>
        <IconWrapper dangerouslySetInnerHTML={{ __html: iconString }} />
        <Title>{title}</Title>
      </Container>
    </OuterContainer>
  )
}
