declare module 'react-visibility-sensor' {
  import * as React from 'react'

  interface Shape {
    top?: number
    left?: number
    bottom?: number
    right?: number
  }

  interface Props {
    onChange?: (isVisible: boolean, visibilityRect?: Shape) => void
    active?: boolean
    partialVisibility?: boolean
    offset?: Shape
    minTopValue?: number
    intervalCheck?: boolean
    intervalDelay?: number
    scrollCheck?: boolean
    scrollDelay?: number
    scrollThrottle?: number
    resizeCheck?: boolean
    resizeDelay?: number
    resizeThrottle?: number
    delayedCall?: boolean
    children?:
      | ((args: {
          isVisible: boolean
          visibilityRect?: Shape
        }) => React.ReactNode)
      | React.ReactNode
  }

  export const ReactVisibilitySensor: React.FunctionComponent<Props>

  export default ReactVisibilitySensor
}
