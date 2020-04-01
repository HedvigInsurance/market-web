import axios from 'axios'
import { config } from '../config'
import { appLogger } from '../logging'
import { redisClient } from './redis'

interface TeamtailorUser {
  id: string
  type: 'users'
  links: { self: string }
  attributes: {
    description: string | null
    'facebook-profile': string | null
    'hide-email': boolean
    'instagram-profile': string | null
    'linkedin-profile': string | null
    name: string
    phone: string | null
    picture: any
    title: string
    'twitter-profile': string | null
    username: string | null
    visible: boolean
    email: string
  }
}

export interface User {
  teamtailorId: string
  name: string
  title: string
  picture: {
    standard: string
    large: string | null
  }
}

const getTeamtailorUsers = async ({
  url,
}: {
  url: string
}): Promise<ReadonlyArray<TeamtailorUser>> => {
  appLogger.info(`Getting teamtailor data at "${url}"`)
  const result = await axios.get<{
    data: ReadonlyArray<TeamtailorUser>
    links: { next: string | null }
  }>(url, {
    headers: {
      Authorization: `Token token=${config.teamtailorApiToken}`,
      'X-Api-Version': '20161108',
      Accept: 'application/vnd.api+json',
    },
  })

  if (result.data.links.next) {
    const nextData = await getTeamtailorUsers({ url: result.data.links.next })
    return [...result.data.data, ...nextData]
  }

  return result.data.data
}

const handleTeamtailorResponse = async (
  response: ReadonlyArray<TeamtailorUser>,
) => {
  const usersToSave = response.map((user) => ({
    teamtailorId: user.id,
    name: user.attributes.name,
    title: user.attributes.title,
    picture: {
      standard: user.attributes.picture
        ? user.attributes.picture.standard
        : null,
      large: user.attributes.picture
        ? user.attributes.picture.standard
            .replace('h_160', 'h_1024')
            .replace('w_160', 'w_1024')
        : null,
    },
  }))
  await redisClient.set('teamtailor_users', JSON.stringify(usersToSave))
  appLogger.info(`Saved ${usersToSave.length} teamtailor users`)
}

export const initializeTeamtailorUsers = () =>
  getTeamtailorUsers({
    url: 'https://api.teamtailor.com/v1/users',
  })
    .then(handleTeamtailorResponse)
    .catch(async (e) => {
      appLogger.error(
        `Failed to fetch Teamtailor data: "${e.message ||
          e.status}", retrying after 5 sec...`,
      )

      await new Promise((resolve) => setTimeout(resolve, 100))

      return getTeamtailorUsers({
        url: 'https://api.teamtailor.com/v1/users',
      }).then(handleTeamtailorResponse)
    })
    .catch((e) => {
      appLogger.error(
        `Finally cannot fetch Teamtailor data: "${e.message || e.status}"!`,
      )
    })

export const getCachedTeamtailorUsers = async () =>
  JSON.parse((await redisClient.get('teamtailor_users')) || '[]')
