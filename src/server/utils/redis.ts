import * as Redis from 'ioredis'
import { config } from '../config'

export const redisClient = new Redis(config.redisUrl)
