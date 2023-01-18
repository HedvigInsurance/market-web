import { LinkComponent } from '../storyblok/StoryContainer'

export const getStoryblokLinkUrl = (link: LinkComponent) => {
  const cachedLink =
    link.linktype !== 'story' || /^\//.test(link.cached_url)
      ? link.cached_url
      : `/${link.cached_url}`
  const publicHost = getPublicHost()
  return publicHost
    ? cachedLink.replace('https://www.hedvig.com', publicHost)
    : cachedLink
}

export const getPublicHost = (): string | undefined => {
  if (
    typeof window === 'undefined' &&
    typeof process !== 'undefined' &&
    process.env.PUBLIC_HOST
  ) {
    return process.env.PUBLIC_HOST
  }

  if (typeof window !== 'undefined') {
    return (window as any).PUBLIC_HOST
  }

  return ''
}
export const getStoryblokImage = (url?: string) =>
  getPublicHost()
    ? (url || '').replace(
        /^(https?:)?\/\/a\.storyblok\.com\//,
        getPublicHost() + '/',
      )
    : url

export type ImageLegacy = string

export type Image = {
  id: string
  alt: string
  name: string
  focus: string
  title: string
  filename: string
  copyright: string
  fieldtype: 'asset'
  is_external_url: boolean
}

export interface NativeColor {
  uuid: string
  color: string
}
