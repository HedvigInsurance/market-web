declare module 'react-animate-height' {
  import React from 'react'
  const ReactAnimateHeight: React.ComponentType<{
    height: string | number
    duration?: number
    delay?: number
    easing?: string
    className?: string
    style?: CSSStyleDeclaration
    contentClassName?: string
    animationStateClasses?: {
      animating?: string
      animatingUp?: string
      animatingDown?: string
      static?: string
      animatingToHeightZero?: string
      animatingToHeightAuto?: string
      animatingToHeightSpecific?: string
      staticHeightZero?: string
      staticHeightAuto?: string
      staticHeightSpecific?: string
    }
    onAnimationStart?: () => void
    onAnimationEnd?: () => void
    applyInlineTransitions?: boolean
    animateOpacity?: boolean
  }>

  export default ReactAnimateHeight
}
