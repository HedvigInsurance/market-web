type CookieConfig = {
  name: string
  maxAge: number
}

export type AbTestConfig = {
  optimizeExperimentId: string
  experimentQueryParam: string
  cookies: {
    variant: CookieConfig
    eligible: CookieConfig
  }
  redirects: Record<string, string>
}

export const newSiteAbTest: AbTestConfig = {
  optimizeExperimentId: 'wmRyD1ofQYSQ5LL5BEH9nw',
  experimentQueryParam: 'experimentVariantId',
  cookies: {
    variant: {
      name: 'HEDVIG_EXP_NEW_SITE',
      maxAge: 7 * 24 * 3600 * 1000,
    },
    eligible: {
      name: 'HEDVIG_EXP_NEW_SITE_ELIGIBLE',
      maxAge: 0,
    },
  },
  redirects: {
    '/se-en': '/en-se',
    '/se-en/insurances/home-insurance/rental': '/en-se/products/home',
    '/se-en/insurances/car-insurance': '/en-se/products/car',
    // TODO: Add remaining product pages
    // TODO: Add Swedish pages
  },
}
