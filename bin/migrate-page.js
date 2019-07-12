require('dotenv').config()

const axios = require('axios').default
const yargs = require('yargs')
const fs = require('fs')

const client = axios.create({
  baseURL: 'https://mapi.storyblok.com',
})
const spaceId = yargs.argv.space
const pageId = yargs.argv.page
const authorization = process.env.STORYBLOK_MANAGEMENT_TOKEN

const updatePage = async () => {
  const { story } = (await client.get(
    `/v1/spaces/${spaceId}/stories/${pageId}`,
    {
      headers: { authorization },
    },
  )).data

  console.log('Got page')

  const replaceI18n = (o) =>
    Object.keys(o).reduce((currentBlock, key) => {
      const newKey = key.endsWith('__i18n__en')
        ? key.replace('__i18n__en', '')
        : key

      if (
        (newKey === key && o.hasOwnProperty(key + '__i18n__en')) ||
        ['_uid'].includes(newKey)
      ) {
        return {
          ...currentBlock,
        }
      }

      if (Array.isArray(o[key]) && o[key].length > 0) {
        return {
          ...currentBlock,
          [newKey]: o[key].map(replaceI18n),
        }
      }

      return {
        ...currentBlock,
        [newKey]: Array.isArray(o[key]) ? o[key].map(replaceI18n) : o[key],
      }
    }, {})

  const content = {
    ...story.content,
    ...replaceI18n(story.content),
    _uid: undefined,
  }

  await client.put(
    `/v1/spaces/${spaceId}/stories/${pageId}`,
    {
      story: {
        name: story.name,
        slug: story.slug,
        content,
      },
    }, // data
    { headers: { authorization } },
  )
  console.log('Updated english')
}

updatePage()
  .then(() => console.log('done'))
  .catch(console.error)
