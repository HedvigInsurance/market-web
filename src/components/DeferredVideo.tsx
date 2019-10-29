import * as React from 'react'
import styled from 'react-emotion'
import VisibilitySensor from 'react-visibility-sensor'

const Video = styled('video')({
  width: '100%',
  objectFit: 'cover',
  transition: 'height 1500ms',
  overflow: 'hidden',
  borderRadius: 0.01,
  bottom: 0,
  right: 0,
  left: 0,
  height: '100%',
})

interface State {
  width?: number
  height?: number
  ref: React.RefObject<HTMLVideoElement>
}

const stateHasRef = (
  state: State,
): state is { ref: React.RefObject<HTMLVideoElement> } =>
  Boolean(typeof state.ref === 'object' && state.ref && state.ref.current)

export class DeferredVideo extends React.PureComponent<
  React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  >,
  State
> {
  public state: State = {
    width: undefined,
    height: undefined,
    ref: React.createRef<any>(),
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
              this.state.ref.current!.load()
            }
          }
        }}
      >
        {({ isVisible }) => (
          <Video
            poster={`${this.props.src}.png`}
            innerRef={this.state.ref}
            playsInline
            autoPlay
            muted={true}
            loop={true}
            controls={false}
          >
            <source
              src={isVisible ? `${this.props.src}.m3u8` : undefined}
              type="application/vnd.apple.mpegurl"
            />
            <source
              src={isVisible ? `${this.props.src}.mp4` : undefined}
              type="video/mp4"
            />
            <source
              src={isVisible ? `${this.props.src}.webm` : undefined}
              type="video/webm"
            />
          </Video>
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
