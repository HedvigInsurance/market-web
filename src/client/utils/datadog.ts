import { datadogRum } from '@datadog/browser-rum'

export const initRum = () => {
  datadogRum.init({
    ...(window as any).DATADOG_CONFIG,
    site: 'datadoghq.eu',
    service: 'web-onboarding',
    sampleRate: 100,
    trackInteractions: true,
    defaultPrivacyLevel: 'mask-user-input',
    env: (window as any).APP_ENVIRONMENT,
  })

  datadogRum.startSessionReplayRecording()
}
