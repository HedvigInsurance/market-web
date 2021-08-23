require('dotenv').config()

const axios = require('axios').default
const yargs = require('yargs')

const STORYBLOK_AUTHORIZATION = process.env.STORYBLOK_MANAGEMENT_TOKEN
const TRUSTPILOT_API_KEY = process.env.TRUSTPILOT_API_KEY
const SPACE_ID = yargs.argv.space
const PAGE_ID = yargs.argv.page

const storyblokClient = axios.create({
  baseURL: 'https://mapi.storyblok.com/v1',
  headers: { authorization: STORYBLOK_AUTHORIZATION },
})

const trustpilotClient = axios.create({
  baseURL: 'https://api.trustpilot.com/v1',
  headers: { apikey: TRUSTPILOT_API_KEY },
})

const getTrustpilotBusinessUnit = async (id) => {
  const response = await trustpilotClient.get(`/business-units/${id}`)
  const { score, numberOfReviews } = response.data
  return {
    trustScore: score.trustScore,
    numberOfReviews: numberOfReviews.total,
  }
}

const updateGlobalStory = async () => {
  const pageUrl = `/spaces/${SPACE_ID}/stories/${PAGE_ID}`

  console.log('Fetching global story: ', pageUrl)
  const response = await storyblokClient.get(pageUrl)
  const {
    story: { name, slug, content },
  } = response.data
  console.log('Got global story')

  if (!content.trustpilot_business_unit) {
    console.log('No Trustpilot business unit defined - add it in Storyblok!')
    return
  }

  console.log('Fetching Trustpilot data: ', content.trustpilot_business_unit)
  const { trustScore, numberOfReviews } = await getTrustpilotBusinessUnit(
    content.trustpilot_business_unit,
  )
  console.log('Got Trustpilot data')
  console.log(`Trust score: ${trustScore}`)
  console.log(`Number of reviews: ${numberOfReviews}`)

  const data = {
    story: {
      name,
      slug,
      content: {
        ...content,
        structured_data_review_value: trustScore,
        structured_data_review_count: numberOfReviews,
      },
    },
    publish: 1,
  }

  console.log('Updating global story')
  await storyblokClient.put(pageUrl, data)
  console.log('Updated global story')
}

updateGlobalStory()
  .then(() => console.log('Done'))
  .catch(console.error)
