import * as dotenv from 'dotenv'
dotenv.config()

export interface Config {
  forceHost?: string
  storyblokApiToken: string
}

export const config: Config = {
  forceHost: process.env.FORCE_HOST,
  storyblokApiToken: process.env.STORYBLOK_API_TOKEN!,
}
