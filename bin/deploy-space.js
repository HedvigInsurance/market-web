#!/usr/bin/env node
const chalk = require('chalk').default
const axios = require('axios').default
const yargs = require('yargs')

const client = axios.create({
  baseURL: 'https://api.storyblok.com',
})

const getArgs = () => {
  const { name, domain, duplicate } = yargs.argv
  if (!name) {
    throw new Error('Must provide a space name')
  }
  if (!domain) {
    throw new Error('Must provide a space domain')
  }

  return { name, domain, duplicate }
}

const deploy = async () => {
  const { name, domain, duplicate } = getArgs()
  console.log(
    chalk.magenta(
      `Deploying new Storyblok space "${chalk.bold(name)}" -> "${chalk.bold(
        domain,
      )}"${duplicate ? `, a duplicate of ${duplicate}` : ''}`,
    ),
  )
  if (!process.env.STORYBLOK_MANAGEMENT_TOKEN) {
    throw new Error(
      'No management token provided, set the "STORYBLOK_MANAGEMENT_TOKEN" environment variable',
    )
  }

  if (!yargs.argv['skip-wait']) {
    await new Promise((resolve) => {
      console.log(
        'Waiting waiting ' +
          chalk.green('5 seconds') +
          ' so you can abort if this was a mistake...',
      )
      setTimeout(resolve, 5 * 1000)
    })
  }

  let result
  try {
    result = await client.request({
      method: 'POST',
      url: '/v1/spaces',
      data: {
        space: { name, domain },
        dup_id: duplicate,
      },
      headers: {
        authorization: process.env.STORYBLOK_MANAGEMENT_TOKEN,
      },
    })
  } catch (e) {
    console.error(
      'Storyblok request errored: ',
      JSON.stringify(e.response && e.response.data),
    )
    throw e
  }

  return {
    name: result.data.space.name,
    domain: result.data.space.domain,
    id: result.data.space.id,
  }
}

deploy()
  .then(({ name, domain, id }) => {
    console.log(
      chalk.green(
        `Successfully deployed new space #${chalk.bold(id)} "${chalk.bold(
          name,
        )}" -> "${chalk.bold(domain)}"`,
      ),
    )
  })
  .catch((err) => {
    console.error(chalk.red(err))
    process.exitCode = 1
  })
