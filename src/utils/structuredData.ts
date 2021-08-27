import { AccordionProps } from 'blocks/AccordionBlock/AccordionBlock'

const DEFAULT_WEBSITE_DESCRIPTION =
  'Hedvig är en ny typ av försäkring. Byggd på smart teknik, omtanke och sunt förnuft. Så att du kan få hjälp på sekunder, och ersättning på minuter.'

const DEFAULT_ORG_DESCRIPTION =
  'Med Hedvig Hemförsäkring får du allt du förväntar dig av en försäkring, men inget du förväntar dig av ett försäkringsbolag'

export const structuredFAQPage = (
  accordions: ReadonlyArray<AccordionProps>,
) => ({
  '@context': 'http://schema.org',
  '@type': 'FAQPage',
  mainEntity: accordions.map((item) => ({
    '@type': 'Question',
    name: item.title,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.paragraph.html,
    },
  })),
})

export const structuredSoftwareApplication = () => [
  {
    '@context': 'http://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hedvig',
    operatingSystem: 'IOS',
    applicationCategory: 'FinanceApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '1200',
    },
  },
  {
    '@context': 'http://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Hedvig',
    operatingSystem: 'ANDROID',
    applicationCategory: 'FinanceApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.4',
      ratingCount: '180',
    },
  },
]

interface StructuredWebSiteParams {
  description?: string
}

export const structuredWebSite = ({
  description = DEFAULT_WEBSITE_DESCRIPTION,
}: StructuredWebSiteParams = {}) => ({
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  name: 'Hedvig',
  url: 'https://www.hedvig.com',
  description,
})

interface StructuredOrganizationParams {
  description?: string
}

const structuredDataOrganization = ({
  description,
}: Required<StructuredOrganizationParams>) => ({
  '@type': 'Organization',
  name: 'Hedvig',
  url: 'https://www.hedvig.com',
  logo: 'https://www.hedvig.com/assets-next/favicons/apple-icon.png',
  description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Valhallavägen 117',
    addressLocality: 'Stockholm',
    postalCode: '115 31',
    addressCountry: 'SE',
  },
  sameAs: [
    'https://www.fb.me/hedvigapp/',
    'https://twitter.com/hedvigapp',
    'https://www.instagram.com/hedvig/',
    'https://www.linkedin.com/company/hedvig/',
  ],
})

export const structuredOrganization = ({
  description = DEFAULT_ORG_DESCRIPTION,
}: StructuredOrganizationParams = {}) => ({
  '@context': 'http://schema.org',
  ...structuredDataOrganization({ description }),
})

interface StructuredReviewSnippetParams extends StructuredOrganizationParams {
  value: string
  count: string
}

export const structuredDataReviewSnippet = ({
  value,
  count,
  description = DEFAULT_ORG_DESCRIPTION,
}: StructuredReviewSnippetParams) => ({
  '@context': 'http://schema.org',
  '@type': 'AggregateRating',
  itemReviewed: structuredDataOrganization({ description }),
  ratingValue: value,
  bestRating: '5',
  reviewCount: count,
})
