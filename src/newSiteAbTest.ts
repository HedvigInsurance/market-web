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
    '/se': '/se',
    '/se/forsakringar': '/se/forsakringar',
    '/se/forsakringar/hemforsakring': '/se/forsakringar/hemforsakring',
    '/se/forsakringar/hemforsakring/villaforsakring':
      '/se/forsakringar/hemforsakring/villaforsakring',
    '/se/forsakringar/hemforsakring/bostadsratt':
      '/se/forsakringar/hemforsakring/bostadsratt',
    '/se/forsakringar/hemforsakring/hyresratt':
      '/se/forsakringar/hemforsakring/hyresratt',
    '/se/forsakringar/hemforsakring/student':
      '/se/forsakringar/hemforsakring/student',
    '/se/forsakringar/olycksfallsforsakring':
      '/se/forsakringar/olycksfallsforsakring',
    '/se/forsakringar/bilforsakring': '/se/forsakringar/bilforsakring',
  },
}
