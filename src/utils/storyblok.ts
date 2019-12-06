import { LinkComponent } from '../storyblok/StoryContainer'

export const getStoryblokLinkUrl = (link: LinkComponent) =>
  link.linktype !== 'story' || /^\//.test(link.cached_url)
    ? link.cached_url
    : `/${link.cached_url}`
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
export const getStoryblokImage = (url?: Image) =>
  getPublicHost()
    ? (url || '').replace(
        /^(https?:)?\/\/a\.storyblok\.com\//,
        getPublicHost() + '/',
      )
    : url

export type Image = string
export interface NativeColor {
  uuid: string
  color: string
}
