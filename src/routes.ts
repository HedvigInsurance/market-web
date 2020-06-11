import React from 'react'
import { BlogPostsPage } from './pages/BlogPostsPage'
import { BlogPostsTagPage } from './pages/BlogPostsTagPage'
import { PageFork } from './pages/PageFork'

export interface Route {
  path: string
  Component: React.ComponentType<{ nonce?: string }>
  exact: boolean
  ignoreStoryblokMiss?: boolean
}

export const routes: Route[] = [
  {
    path: '/blog/tags/:tag',
    exact: true,
    Component: BlogPostsTagPage,
    ignoreStoryblokMiss: true,
  },
  {
    path: '/blog',
    exact: true,
    Component: BlogPostsPage,
    ignoreStoryblokMiss: true,
  },
  { path: '/*', exact: false, Component: PageFork, ignoreStoryblokMiss: true },
]

export const redirects: ReadonlyArray<[string, string, number]> = [
  ['/en/legal', '/legal', 302],
  ['/en/privacy', '/privacy', 302],
  ['/seb', '/hemforsakring/seb?partner=seb&code=bank', 302],
  ['/en/student', '/en/hemforsakring/student', 301],
  ['/press', '/about-us', 301],
  ['/terms', '/villkor', 301],
  ['/villkor', '/se/terms', 301],
  ['/zero', '/se/forever', 301],
  ['/en/zero', '/se-en/forever', 301],
  ['/student', '/hemforsakring/student', 301],
  [
    '/uploads/press-2018-09-19.pdf',
    '/f/50672/x/6eb539f57f/press-2018-09-19.pdf',
    301,
  ],
  ['/blog/tags/meet-the-team', '/blog/tags/meet%20the%20team', 301],
  [
    '/blog/2018-11-16-meet-the-team-%E2%80%93-sofia',
    '/blog/2018-11-16-meet-the-team-sofia',
    301,
  ],
  [
    '/blog/2018-10-12-hedvig-och-qasa-g%C3%B6r-det-enklare-och-tryggare-att-hyra-ut-din-bostad',
    '/blog/2018-10-12-hedvig-och-qasa-gor-det-enklare-och-tryggare-att-hyra-ut-din-bostad',
    301,
  ],
  [
    '/assets/press/hedvig-press-assets.zip',
    'https://cdn.hedvig.com/identity/hedvig-press-assets.zip',
    301,
  ],
  ['/hedvig-dreams', '/blog/hedvig-dreams', 301],
  [
    '/hur-tarar-gor-oss-starkare-som-bolag',
    '/blog/hur-tarar-gor-oss-starkare-som-bolag',
    301,
  ],

  // Terms and conditions - hyresratt and bostadsratt
  [
    '/villkor/villkor/hyresratt.pdf',
    'https://cdn.hedvig.com/info/forsakringsvillkor-hyresratt-2020-05-v2.pdf',
    302,
  ],
  [
    '/en/terms/terms/tenants.pdf',
    'https://cdn.hedvig.com/info/insurance-terms-tenants-2020-05.pdf',
    302,
  ],
  [
    '/villkor/villkor/bostadsratt.pdf',
    'https://cdn.hedvig.com/info/forsakringsvillkor-bostadsratt-2020-05-v2.pdf',
    302,
  ],
  [
    '/en/terms/terms/tenant-owners.pdf',
    'https://cdn.hedvig.com/info/insurance-terms-tenant-owners-2020-05.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation/hyresratt.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-hyresratt-2018-02.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation/bostadsratt.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-bostadsratt-2018-02.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation-eu/hyresratt.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-hyresratt-eustandard-2020-04.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation-eu/bostadsratt.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-bostadsratt-eustandard-2020-04.pdf',
    302,
  ],

  // Terms and conditions - students
  [
    '/villkor/villkor/hyresratt-student.pdf',
    'https://cdn.hedvig.com/info/forsakringsvillkor-student-hyresratt-2020-05-v2.pdf',
    302,
  ],
  [
    '/en/terms/terms/tenant-student.pdf',
    'https://cdn.hedvig.com/info/insurance-terms-student-tenant-2020-05.pdf',
    302,
  ],
  [
    '/villkor/villkor/bostadsratt-student.pdf',
    'https://cdn.hedvig.com/info/forsakringsvillkor-student-bostadsratt-2020-05-v2.pdf',
    302,
  ],
  [
    '/en/terms/terms/tenant-owner-student.pdf',
    'https://cdn.hedvig.com/info/insurance-terms-student-tenant-owners-2020-05.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation/hyresratt-student.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-student-hyresratt-2018-08.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation/bostadsratt-student.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-student-bostadsratt-2018-08.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation-eu/hyresratt-student.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-student-hyresratt-eustandard-2020-04.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation-eu/bostadsratt-student.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-student-bostadsratt-eustandard-2020-04.pdf',
    302,
  ],

  // Terms and conditions - house
  [
    '/villkor/villkor/hus-villa.pdf',
    'https://cdn.hedvig.com/info/forsakringsvillkor-villa-2020-05-v2.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation/hus-villa.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-villa-2019-10.pdf',
    302,
  ],
  [
    '/villkor/forkopsinformation-eu/hus-villa.pdf',
    'https://cdn.hedvig.com/info/forkopsinformation-villa-eustandard-2020-04.pdf',
    302,
  ],
  [
    '/en/terms/terms/house-owners.pdf',
    'https://cdn.hedvig.com/info/insurance-terms-house-owners-2019-10.pdf',
    302,
  ],

  // Terms and conditions - norway - Home Content
  [
    '/no/villkar/villkar/innbo.pdf',
    'https://cdn.hedvig.com/info/innbo-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no/villkar/generelle-villkar/innbo.pdf',
    'https://cdn.hedvig.com/info/generelle-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no/villkar/informasjon-for-kjopet-eu/innbo.pdf',
    'https://cdn.hedvig.com/info/informasjon-for-kjopet-eu-innbo.pdf',
    302,
  ],
  // Awaiting english terms - so default to norwegian
  [
    '/no-en/terms/terms/home-content.pdf',
    'https://cdn.hedvig.com/info/innbo-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no-en/terms/general-terms/home-content.pdf',
    'https://cdn.hedvig.com/info/generelle-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no-en/terms/presale-info-eu/home-content.pdf',
    'https://cdn.hedvig.com/info/informasjon-for-kjopet-eu-innbo.pdf',
    302,
  ],

  // Travel
  [
    '/no/villkar/villkar/reise.pdf',
    'https://cdn.hedvig.com/info/reise-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no/villkar/generelle-villkar/reise.pdf',
    'https://cdn.hedvig.com/info/generelle-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no/villkar/informasjon-for-kjopet-eu/reise.pdf',
    'https://cdn.hedvig.com/info/informasjon-for-kjopet-eu-reise.pdf',
    302,
  ],
  // Awaiting english terms - so default to norwegian
  [
    '/no-en/terms/terms/travel.pdf',
    'https://cdn.hedvig.com/info/reise-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no-en/terms/general-terms/travel.pdf',
    'https://cdn.hedvig.com/info/generelle-vilkar-2020-04.pdf',
    302,
  ],
  [
    '/no-en/terms/presale-info-eu/travel.pdf',
    'https://cdn.hedvig.com/info/informasjon-for-kjopet-eu-reise.pdf',
    302,
  ],
  // Redirect to our claimsrating Slack workspace
  [
    '/claimsrating',
    'https://join.slack.com/t/hedvigclaimsrating/shared_invite/zt-f37hza38-Z0GEgFViLEQjO6Mi5KAGBA',
    302,
  ],
]
