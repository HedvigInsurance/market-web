import * as dotenv from 'dotenv'
if (process.env.NODE_ENV !== 'test') {
  dotenv.config()
}

export interface Config {
  redisUrl?: string
  forceHost?: string
  teamtailorApiToken?: string
  storyblokApiToken: string
}

export const config: Config = {
  // Staging config first, production and local as fallback
  redisUrl: process.env.HEROKU_REDIS_WHITE_TLS_URL || process.env.REDIS_URL,
  forceHost: process.env.FORCE_HOST,
  teamtailorApiToken: process.env.TEAMTAILOR_API_TOKEN,
  storyblokApiToken: process.env.STORYBLOK_API_TOKEN!,
}
