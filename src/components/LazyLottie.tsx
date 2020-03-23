import { Container } from 'constate'
import React from 'react'
import { Mount } from 'react-lifecycle-components'
import ReactLottieComponent, { ReactLottieProps } from 'react-lottie'

interface State {
  animationData: any | null
  ReactLottie: typeof ReactLottieComponent | null
}

interface Actions {
  setLoadedAnimationData: (animationData: any) => void
  setLoadedLottie: (ReactLottie: typeof ReactLottieComponent) => void
}

export const LazyLottie: React.SFC<ReactLottieProps & {
  innerRef?: React.Ref<any> | null
}> = (props) =>
  process.env.NODE_ENV === 'test' ? null : (
    <Container<State, Actions>
      initialState={{ animationData: null, ReactLottie: null }}
      actions={{
        setLoadedAnimationData: (animationData: any) => () => ({
          animationData,
        }),
        setLoadedLottie: (ReactLottie: typeof ReactLottieComponent) => () => ({
          ReactLottie,
        }),
      }}
    >
      {({
        animationData,
        setLoadedAnimationData,
        ReactLottie,
        setLoadedLottie,
      }: State & Actions) => (
        <Mount
          on={() => {
            props.options.animationData.then(setLoadedAnimationData)
            import(/* webpackChunkName: "react-lottie" */ 'react-lottie').then(
              (lottieModule) => {
                if (!lottieModule || !lottieModule.default) {
                  return
                }

                setLoadedLottie(lottieModule.default)
              },
            )
          }}
        >
          {animationData !== null && ReactLottie !== null ? (
            <ReactLottie
              {...props}
              ref={props.innerRef}
              options={{ ...props.options, animationData }}
            />
          ) : null}
        </Mount>
      )}
    </Container>
  )
