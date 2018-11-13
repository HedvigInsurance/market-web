import * as dotenv from 'dotenv'
dotenv.config()

export interface Config {
  storyblokApiToken: string
}

export const config: Config = {
  storyblokApiToken: process.env.STORYBLOK_API_TOKEN!,
}
