import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import axios from 'axios'
import {
  LAPTOP_BP_UP,
  MOBILE_BP_UP,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { PerilIcon } from 'components/Perils/types'
import React, { useEffect, useState } from 'react'

interface PerilItemProps {
  title: React.ReactNode
  description: string
  icon: PerilIcon
}

const OuterContainer = styled.div`
  color: ${colorsV3.gray900};
`

const Container = styled.button`
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
  background-color: ${colorsV3.gray100};
  cursor: pointer;
  transition: all 150ms ease-in-out;
  -webkit-appearance: none;

  :focus {
    outline: none;
  }

  &:focus {
    box-shadow: none;
    outline: none;
  }

  ${TABLET_BP_UP} {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5rem;

    :hover {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
      transform: translateY(-2px);
    }
  }

  ${TABLET_BP_UP} {
    padding: 1.25rem;
    border-radius: 0.5rem;
  }

  :active {
    background-color: ${colorsV3.gray300};
    box-shadow: none;
  }
`

const IconWrapper = styled.div`
  display: flex;
  margin-right: 0.375rem;

  ${TABLET_BP_UP} {
    margin-bottom: 0.625rem;
  }

  svg {
    width: 2rem;
    height: 2rem;

    ${MOBILE_BP_UP} {
      width: 2.5rem;
      height: 2.5rem;
    }

    ${TABLET_BP_UP} {
      width: 3rem;
      height: 3rem;
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
    margin-bottom: 1rem;
    font-size: 1.25rem;
  }

  ${LAPTOP_BP_UP} {
    font-size: 1.5rem;
  }
`

export const Description = styled.p`
  display: none;

  ${TABLET_BP_UP} {
    display: block;
    margin-top: 0;
    flex: 1;
    font-size: 0.875rem;
    text-align: left;
    line-height: 1.45;
    color: ${colorsV3.gray700};
  }
`

export const PerilItem: React.FC<PerilItemProps> = ({
  title,
  description,
  icon,
}) => {
  const [iconString, seticonString] = useState<string | null>(null)
  const iconUrl: string = icon.variants.light.svgUrl

  useEffect(() => {
    const fetchIcon = async () => {
      if (!iconUrl) {
        return
      }
      const url = `https://graphql.dev.hedvigit.com${iconUrl}`
      const iconResponse = await axios.get(url, {
        withCredentials: false,
      })
      seticonString(iconResponse.data)
    }

    fetchIcon()
  }, [icon])

  return (
    <OuterContainer>
      <Container>
        {iconString && (
          <IconWrapper dangerouslySetInnerHTML={{ __html: iconString }} />
        )}
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    </OuterContainer>
  )
}
