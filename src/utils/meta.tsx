import React from 'react'
import {
  GlobalStory,
  HrefLang,
  SeoContent,
  Story,
} from '../storyblok/StoryContainer'
import { LocaleData } from '../l10n/locales'
import { getLocaleData } from '../l10n/l10n-utils'
import { getPublicHost, getStoryblokImage } from './storyblok'
import {
  structuredDataReviewSnippet,
  structuredOrganization,
  structuredWebSite,
} from './structuredData'

interface Meta {
  story?: Story & { content: SeoContent & HrefLang }
  nonce?: string
  fullSlug?: string
  title?: string
  currentLocale?: LocaleData
  globalStory: GlobalStory
}

export const removeTrailingSlash = (text: string) => text.replace(/\/+$/, '')

const getFullSlugFromStory = (story?: Story) =>
  story && removeTrailingSlash(story.full_slug)

const getPageTitleFromStory = (story?: Story) => {
  if (!story) {
    return ''
  }
  return story.content.page_title || story.name
}

const getAlternateLang = (fullSlug: string) => {
  const localeSlug = fullSlug.split('/')[0]
  const marketLocale = getLocaleData(localeSlug as LocaleData['label'])
  return marketLocale.hrefLang
}

export const getMeta = ({
  story,
  title,
  nonce = '',
  fullSlug,
  currentLocale,
  globalStory,
}: Meta) => (
  <>
    <script type="application/ld+json" nonce={nonce} key="jsonld">
      {JSON.stringify([
        structuredWebSite({
          description: globalStory.content.structured_data_website_description,
        }),
        structuredOrganization({
          description:
            globalStory.content.structured_data_organization_description,
        }),
        ...(globalStory.content.structured_data_review_value &&
        globalStory.content.structured_data_review_count
          ? [
              structuredDataReviewSnippet({
                value: globalStory.content.structured_data_review_value,
                count: globalStory.content.structured_data_review_count,
                description:
                  globalStory.content.structured_data_organization_description,
              }),
            ]
          : []),
      ])}
    </script>

    <title>{title ? title : getPageTitleFromStory(story)}</title>
    <link
      rel="canonical"
      href={`${getPublicHost()}/${fullSlug || getFullSlugFromStory(story)}`}
    />

    {story && (
      <link
        rel="alternate"
        hrefLang={getAlternateLang(story.full_slug)}
        href={`${getPublicHost()}/${fullSlug || getFullSlugFromStory(story)}`}
      />
    )}
    {story &&
      story.alternates?.map(
        (alternate) =>
          alternate.published && (
            <link
              key={alternate.id}
              rel="alternate"
              hrefLang={getAlternateLang(alternate.full_slug)}
              href={`${getPublicHost()}/${removeTrailingSlash(
                alternate.full_slug,
              )}`}
            />
          ),
      )}
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
    {story && story.content.seo_meta_og_description && (
      <meta
        property="og:description"
        content={story.content.seo_meta_og_description}
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
      content={`${getPublicHost()}/${fullSlug || getFullSlugFromStory(story)}`}
    />
    {story && story.content.seo_meta_og_title && (
      <meta name="twitter:title" content={story.content.seo_meta_og_title} />
    )}
    {story && story.content.seo_meta_og_description && (
      <meta
        name="twitter:description"
        content={story.content.seo_meta_og_description}
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
    <meta name="theme-color" content="#121212" />
    {currentLocale?.adtractionSrc && (
      <script defer src={currentLocale.adtractionSrc}></script>
    )}
  </>
)
