import styled from '@emotion/styled'
import React, { MutableRefObject } from 'react'
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
}))

const stateHasRef = (
  state: State,
): state is { ref: React.RefObject<HTMLImageElement> } =>
  Boolean(typeof state.ref === 'object' && state.ref && state.ref.current)

export class DeferredImage extends React.PureComponent<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > & { imageRef?: MutableRefObject<HTMLImageElement | null> | null },
  State
> {
  public state: State = {
    width: undefined,
    height: undefined,
    ref: this.props.imageRef || React.createRef<HTMLImageElement>(),
    isLoaded: false,
  }

  public render() {
    return (
      <VisibilitySensor
        offset={{ top: -200, bottom: -200 }}
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
            src={isVisible ? this.props.src : '/assets-next/empty.png'}
            ref={this.state.ref}
            width={isVisible ? undefined : this.state.width}
            height={isVisible ? undefined : this.state.height}
            isVisible={(this.state.isLoaded && isVisible) ?? false}
            onLoad={() => {
              if (isVisible) {
                this.setState({ isLoaded: true })
              }
            }}
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
