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
  redirects: Array<{ source: RegExp; destination?: string }>
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
  redirects: [
    {
      source: /^\/se/,
    },
    {
      source: /^\/se\/forsakringar/,
    },
    {
      source: /^\/se\/forsakringar\/hemforsakring/,
    },
    {
      source: /^\/se\/forsakringar\/hemforsakring\/villaforsakring/,
    },
    {
      source: /^\/se\/forsakringar\/hemforsakring\/bostadsratt/,
    },
    {
      source: /^\/se\/forsakringar\/hemforsakring\/hyresratt/,
    },
    {
      source: /^\/se\/forsakringar\/hemforsakring\/student/,
    },
    {
      source: /^\/se\/forsakringar\/olycksfallsforsakring/,
    },
    {
      source: /^\/se\/forsakringar\/bilforsakring/,
    },
    {
      source: /^\/se\/forever\/(\w+)/,
    },
  ],
}
