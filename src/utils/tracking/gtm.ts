import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useLocale } from 'context/LocaleContext'
import { newSiteAbTest } from 'newSiteAbTest'
export type AppEnvironment = 'development' | 'staging' | 'production'

type GTMUserProperties = {
  market: string
  environment?: AppEnvironment
  siteVersion: string
}

type DataLayerObject = {
  event?: string
  userProperties?: GTMUserProperties
  eventData?: Record<string, string>
}

/**
 * Track user properties
 */
export const useGTMTracking = () => {
  const market = useLocale().currentLocale.marketLabel

  useEffect(() => {
    pushToGTMDataLayer({
      userProperties: {
        environment: (window as any).APP_ENVIRONMENT,
        market,
        siteVersion: 'old',
      },
    })
  }, [market])

  useEffect(() => trackNewSiteAbTest(), [])
}

export const trackNewSiteAbTest = () => {
  const variantCookie = Cookies.get(newSiteAbTest.cookies.variant.name)
  const variant = parseInt(variantCookie ?? '', 10)
  if (variant === 0) {
    const variantId = `${newSiteAbTest.optimizeExperimentId}.${variant}`
    pushToGTMDataLayer({
      event: 'experiment_impression',
      eventData: {
        experiment_id: newSiteAbTest.optimizeExperimentId,
        variant_id: variantId,
        environment: (window as any).APP_ENVIRONMENT,
      },
    })
  }
}

const pushToGTMDataLayer = (obj: DataLayerObject) => {
  const castedWindow = window as any
  castedWindow.dataLayer = castedWindow.dataLayer || []
  castedWindow.dataLayer.push(obj)
}
