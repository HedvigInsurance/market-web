import { useEffect } from 'react'
import { useLocale } from 'context/LocaleContext'
export type AppEnvironment = 'development' | 'staging' | 'production'

type GTMUserProperties = {
  market: string
  environment?: AppEnvironment
}

type DataLayerObject = {
  event?: string
  userProperties?: GTMUserProperties
}

const getAppEnvironment = () => {
  if (
    typeof window === 'undefined' &&
    typeof process !== 'undefined' &&
    process.env.APP_ENVIRONMENT
  ) {
    return process.env.APP_ENVIRONMENT
  }

  return (window as any).APP_ENVIRONMENT
}

/**
 * Track user properties
 */
export const useGTMTracking = () => {
  const environment = getAppEnvironment()
  const market = useLocale().currentLocale.marketLabel

  useEffect(() => {
    pushToGTMDataLayer({
      userProperties: {
        environment,
        market,
      },
    })
  }, [environment, market])
}

const pushToGTMDataLayer = (obj: DataLayerObject) => {
  const castedWindow = window as any
  castedWindow.dataLayer = castedWindow.dataLayer || []
  castedWindow.dataLayer.push(obj)
}
