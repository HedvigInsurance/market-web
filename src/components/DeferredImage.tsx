import * as React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { EMPTY_PIXEL } from '../utils/pixel'

interface State {
  width?: number
  height?: number
  ref: React.Ref<HTMLImageElement>
}

const stateHasRef = (
  state: State,
): state is { ref: React.RefObject<HTMLImageElement> } =>
  Boolean(typeof state.ref === 'object' && state.ref && state.ref.current)

export class DeferredImage extends React.PureComponent<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  State
> {
  public state: State = {
    width: undefined,
    height: undefined,
    ref: React.createRef(),
  }

  public render() {
    return (
      <VisibilitySensor
        offset={{ top: -300, bottom: -300 }}
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
          <img
            {...this.props}
            src={isVisible ? this.props.src : EMPTY_PIXEL}
            ref={this.state.ref}
            width={this.state.width}
            height={this.state.height}
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
