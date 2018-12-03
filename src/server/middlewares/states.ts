import { Middleware } from 'koa'
import { getBlogPosts } from '../utils/storyblok'
import { getCachedTeamtailorUsers } from '../utils/teamtailor'

export const addTeamtailorUsersToState: Middleware = async (ctx, next) => {
  ctx.state.additionalStates = {
    ...ctx.state.additionalStates,
    teamtailorUsers: { users: await getCachedTeamtailorUsers() },
  }

  await next()
}

export const addBlogPostsToState: Middleware = async (ctx, next) => {
  const response = await getBlogPosts(Boolean(ctx.query._storyblok_published))
  ctx.state.additionalStates = {
    ...ctx.state.additionalStates,
    blogPosts: {
      blogPosts: response.data.stories,
    },
  }
  await next()
}

export const addTagBlogPostsToState: Middleware = async (ctx, next) => {
  const response = await getBlogPosts(
    Boolean(ctx.query._storyblok_published),
    ctx.params.tag,
  )
  ctx.state.additionalStates = {
    ...ctx.state.additionalStates,
    blogPosts: {
      blogPosts: response.data.stories,
    },
  }
  await next()
}
