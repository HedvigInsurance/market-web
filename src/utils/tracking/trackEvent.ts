export const trackEvent = (
  eventName: string,
  properties: Record<string, string | number | boolean | undefined> = {},
  options?: any,
  callback?: () => void,
) => {
  if (window && (window as any).analytics) {
    ;(window as any).analytics.track(
      eventName,
      {
        ...properties,
        branch: 'master',
      },
      options,
      callback,
    )
  }
}
