import * as redis from 'redis'
import { promisify } from 'util'
import { config } from '../config'

const client = redis.createClient(config.redisUrl as string)

export const getAsync = promisify(client.get).bind(client)
export const setAsync = promisify(client.set).bind(client)
