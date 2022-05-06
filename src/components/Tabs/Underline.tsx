import React from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import { LAPTOP_BP_UP } from '../blockHelpers'

export const UNDERLINE_HEIGHT = '2px'

const Line = styled(motion.div)`
  height: ${UNDERLINE_HEIGHT};
  background-color: ${colorsV3.gray900};
  position: absolute;
  bottom: 0;
  width: calc(100% - 1rem);
  z-index: 1;

  ${LAPTOP_BP_UP} {
    width: calc(100% - 2.5rem);
  }
`

export const UnderlineComponent: React.FC = () => {
  return <Line layoutId="underline" />
}
