import { Logger } from 'typescript-logging'

export interface State {
  getLogger: (name: string) => Logger
  requestUuid?: string
}
