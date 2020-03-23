import Redis from 'ioredis'
import { config } from '../config'

export let redisClient: Redis.Redis

if (process.env.NODE_ENV !== 'test') {
  redisClient = new Redis(config.redisUrl)
}
