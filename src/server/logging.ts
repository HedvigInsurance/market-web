import {
  LFService,
  LoggerFactoryOptions,
  LogGroupRule,
  LogLevel,
} from 'typescript-logging'

export const options = new LoggerFactoryOptions().addLogGroupRule(
  new LogGroupRule(/.+/, LogLevel.fromString('info')),
)

export const loggerFactory = LFService.createLoggerFactory(options)

export const appLogger = loggerFactory.getLogger('app')
