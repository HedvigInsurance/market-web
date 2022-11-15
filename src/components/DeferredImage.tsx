import styled from '@emotion/styled'
import React, { createRef, MutableRefObject, PureComponent } from 'react'
import VisibilitySensor from 'react-visibility-sensor'

interface State {
  width?: number
  height?: number
  ref: React.Ref<HTMLImageElement>
  isLoaded?: boolean
}

const Img = styled('img')<{ isVisible: boolean }>(({ isVisible }) => ({
  opacity: isVisible ? 1 : 0,
  transition: 'opacity 300ms',
  maxWidth: '100%',
  height: 'auto',
}))

const getSizeFromURL = (url: string) => {
  const [, rawWidth, rawHeight] = url.match(/\/(\d+)x(\d+)\//) || []

  const width = parseInt(rawWidth, 10) || 0
  const height = parseInt(rawHeight, 10) || 0
  return { width, height }
}

const stateHasRef = (
  state: State,
): state is { ref: React.RefObject<HTMLImageElement> } =>
  Boolean(typeof state.ref === 'object' && state.ref && state.ref.current)

export class DeferredImage extends PureComponent<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { imageRef?: MutableRefObject<HTMLImageElement | null> | null },
  State
> {
  public state: State = {
    width: undefined,
    height: undefined,
    ref: this.props.imageRef || createRef<HTMLImageElement>(),
    isLoaded: false,
  }

  public render() {
    const sizeProps = this.props.src ? getSizeFromURL(this.props.src) : ''
    return (
      <VisibilitySensor
        offset={{ top: -200, bottom: 1 }}
        partialVisibility
        onChange={(isVisible) => {
          if (isVisible) {
            const refObject = stateHasRef(this.state)
              ? this.state.ref.current
              : null
            if (refObject) {
              refObject.addEventListener('load', this.handleSizeChange)
            }
          }
        }}
      >
        {({ isVisible }) => (
          <Img
            {...this.props}
            {...sizeProps}
            loading="lazy"
            src={this.props.src}
            ref={this.state.ref}
            isVisible={isVisible ?? false}
          />
        )}
      </VisibilitySensor>
    )
  }

  private handleSizeChange = () => {
    this.setState((state) => {
      const refObject = stateHasRef(state) ? state.ref.current : null
      if (refObject) {
        return {
          height: refObject.scrollHeight,
          width: refObject.scrollWidth,
        }
      }

      return {}
    })
  }
}
