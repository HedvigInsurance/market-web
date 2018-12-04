declare module 'react-lottie' {
  import * as React from 'react'

  export interface ReactLottieProps {
    eventListeners?: object[] // TODO improve typing
    options: {
      loop?: boolean
      autoplay?: boolean
      animationData: any // TODO improve typing
      renderSettings?: any // TODO improve typing
    } // TODO improve typing
    height?: number | string
    width?: number | string
    isStopped?: boolean
    isPaused?: boolean
    speed?: number
    segments?: number[]
    direction?: number
    ariaRole?: string
    ariaLabel?: string
    isClickToPauseDisabled?: boolean
    title?: string
    style?: ElementCSSInlineStyle
  }
  export type ReactLottieType = React.ComponentClass<ReactLottieProps>
  const ReactLottie: ReactLottieType
  export default ReactLottie
}
