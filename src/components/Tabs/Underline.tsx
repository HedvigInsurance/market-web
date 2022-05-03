import React from 'react'
import { motion } from 'framer-motion'
import { colorsV3 } from '@hedviginsurance/brand'
// import { useMediaQuery } from 'react-responsive'
// import { BREAKPOINTS } from 'utils/mediaQueries'

export const UNDERLINE_HEIGHT = '2px'

export const UnderlineComponent: React.FC = () => {
  // const isDesktop = useMediaQuery({ minWidth: BREAKPOINTS.mediumScreen })

  return (
    <motion.div
      layoutId="underline"
      style={{
        height: UNDERLINE_HEIGHT,
        backgroundColor: colorsV3.gray900,
        position: 'absolute',
        bottom: 0,
        width: 'calc(100% - 2.5rem)',
        zIndex: 1,
      }}
    />
  )
}
