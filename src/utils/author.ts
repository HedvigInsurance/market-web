import { User } from '../server/utils/teamtailor'

export const findAuthor = (
  users?: ReadonlyArray<User>,
  authorName?: string,
): User | null => {
  if (!users) {
    return null
  }
  const author = users.find(({ name }) => name === authorName)
  if (!author) {
    return null
  }

  return author
}
