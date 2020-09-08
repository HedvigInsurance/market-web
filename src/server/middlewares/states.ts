import { IMiddleware } from 'koa-router'
import { Logger } from 'typescript-logging'
import { BlogStory } from 'storyblok/StoryContainer'
import { getBlogPosts } from '../utils/storyblok'
import { getCachedTeamtailorUsers } from '../utils/teamtailor'

export interface State {
  additionalStates?: {
    teamtailorUsers?: { users: any }
    blogPosts?: {
      blogPosts: ReadonlyArray<BlogStory>
    }
  }

  getLogger: (name: string) => Logger
  requestUuid?: string
}

export const addTeamtailorUsersToState: IMiddleware<State> = async (
  ctx,
  next,
) => {
  ctx.state.additionalStates = {
    ...ctx.state.additionalStates,
    teamtailorUsers: { users: await getCachedTeamtailorUsers() },
  }

  await next()
}

export const addBlogPostsToState: IMiddleware<State> = async (ctx, next) => {
  const response = await getBlogPosts(Boolean(ctx.query._storyblok_published))
  ctx.state.additionalStates = {
    ...ctx.state.additionalStates,
    blogPosts: {
      blogPosts: response.data.stories,
    },
  }
  await next()
}

export const addTagBlogPostsToState: IMiddleware<State> = async (ctx, next) => {
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
