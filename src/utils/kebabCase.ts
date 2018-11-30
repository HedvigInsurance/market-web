// @ts-ignore
import * as kebabCase from 'just-kebab-case'

export const kebabCaseTag = (tag: string) =>
  kebabCase(tag)
    .replace(/^-+/, '')
    .replace(/-+$/, '')

export const kebabCaseTags = (tags: ReadonlyArray<string>) =>
  tags
    .filter(Boolean)
    .map(kebabCaseTag)
    .filter(Boolean)
