import { LinkComponent } from '../storyblok/StoryContainer'

export const getStoryblokLinkUrl = (link: LinkComponent) =>
  link.linktype === 'story' ? `/${link.cached_url}` : link.cached_url
