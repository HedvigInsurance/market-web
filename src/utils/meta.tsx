import * as React from 'react'
import { SeoContent, Story } from '../storyblok/StoryContainer'
import { getPublicHost, getStoryblokImage } from './storyblok'

interface Meta {
  story?: Story & { content: SeoContent }
  nonce?: string
  fullSlug?: string
  title?: string
}

const getFullSlugFromStory = (story?: Story) =>
  story && story.full_slug.replace(/\/?home$/, '').replace(/\/sv($|\/)/, '')

const getPageTitleFromStory = (story?: Story) => {
  if (!story) {
    return ''
  }
  return story.content.page_title || story.name
}

export const getMeta = ({ story, title, nonce = '', fullSlug }: Meta) => (
  <>
    {[
      <script type="application/ld+json" nonce={nonce}>
        {`
[
  {
    "name": "Hedvig",
    "@context": "http://schema.org",
    "@type": "WebSite",
    "url": "https://www.hedvig.com",
    "description": "Hedvig är en ny typ av försäkring. Byggd på smart teknik, omtanke och sunt förnuft. Så att du kan få hjälp på sekunder, och ersättning på minuter."
  },
  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "url": "https://www.hedvig.com",
    "logo": "https://www.hedvig.com/assets/identity/hedvig-wordmark-color@2x.png",
    "name": "Hedvig",
    "description": "Hedvig är en ny typ av försäkring. Byggd på smart teknik, omtanke och sunt förnuft. Så att du kan få hjälp på sekunder, och ersättning på minuter.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Artillerigatan 10",
      "addressLocality": "Stockholm",
      "postalCode": "11451",
      "addressCountry": "SE"
    },
    "sameAs": [
      "https://www.fb.me/hedvigapp/",
      "https://twitter.com/hedvigapp",
      "https://www.instagram.com/hedvig.app/",
      "https://www.linkedin.com/company/hedvig/"
    ]
  }
]`}
      </script>,
    ]}
    <title>{title ? title : getPageTitleFromStory(story)}</title>
    <link
      rel="canonical"
      href={`${getPublicHost()}${fullSlug || getFullSlugFromStory(story)}`}
    />
    {story && story.content.robots && (
      <meta
        name="robots"
        content={story.published_at ? story.content.robots : 'noindex'}
      />
    )}
    {story && story.content.seo_meta_title && (
      <meta name="title" content={story.content.seo_meta_title} />
    )}
    {story && story.content.seo_meta_description && (
      <meta name="description" content={story.content.seo_meta_description} />
    )}
    {story && story.content.seo_meta_og_title && (
      <meta property="og:title" content={story.content.seo_meta_og_title} />
    )}
    {story &&
      (story.content.seo_meta_og_description ||
        story.content.seo_og_description) && (
        <meta
          property="og:description"
          content={
            story.content.seo_meta_og_description ||
            story.content.seo_og_description
          }
        />
      )}
    {story && story.content.seo_meta_og_image && (
      <meta
        property="og:image"
        content={getStoryblokImage(story.content.seo_meta_og_image)}
      />
    )}
    <meta
      property="og:url"
      content={`${getPublicHost()}${fullSlug || getFullSlugFromStory(story)}`}
    />
    {story && story.content.seo_meta_og_title && (
      <meta name="twitter:title" content={story.content.seo_meta_og_title} />
    )}
    {story &&
      (story.content.seo_meta_og_description ||
        story.content.seo_og_description) && (
        <meta
          name="twitter:description"
          content={
            story.content.seo_meta_og_description ||
            story.content.seo_og_description
          }
        />
      )}
    {story && story.content.seo_meta_og_image && (
      <meta
        name="twitter:image"
        content={getStoryblokImage(story.content.seo_meta_og_image)}
      />
    )}
    <meta name="twitter:site" content="@hedvigapp" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
    <meta name="theme-color" content="#651eff" />
  </>
)
