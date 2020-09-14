import { IMiddleware } from 'koa-router'
import { Logger } from 'typescript-logging'
import { getCachedTeamtailorUsers } from '../utils/teamtailor'

export interface State {
  additionalStates?: {
    teamtailorUsers?: { users: any }
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
