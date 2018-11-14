#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const chalk = require('chalk').default
const axios = require('axios').default
const yargs = require('yargs')

const client = axios.create({
  baseURL: 'https://api.storyblok.com',
})
const spaceId = yargs.argv.space
const authorization = process.env.STORYBLOK_MANAGEMENT_TOKEN

const plan = async () => {
  const remoteComponentsResponse = await client.get(
    `/v1/spaces/${spaceId}/components`,
    {
      headers: { authorization },
    },
  )
  const localResponse = JSON.parse(
    fs.readFileSync(
      path.resolve(__dirname, '../storyblok/components.json'),
      'utf8',
    ),
  )
  const added = localResponse.components.filter(
    (localComponent) =>
      !Boolean(
        remoteComponentsResponse.data.components.find(
          (remoteComponent) => remoteComponent.name === localComponent.name,
        ),
      ),
  )
  const updated = localResponse.components
    .filter((localComponent) =>
      Boolean(
        remoteComponentsResponse.data.components.find(
          (remoteComponent) => remoteComponent.name === localComponent.name,
        ),
      ),
    )
    .map((localComponent) => [
      localComponent,
      remoteComponentsResponse.data.components.find(
        (remoteComponent) => remoteComponent.name === localComponent.name,
      ),
    ])
  const deleted = remoteComponentsResponse.data.components.filter(
    (remoteComponent) =>
      !Boolean(
        localResponse.components.find(
          (localComponent) => remoteComponent.name === localComponent.name,
        ),
      ),
  )
  return { added, updated, deleted }
}

const sync = async () => {
  if (!spaceId) {
    throw new Error('No space provided')
  }
  console.log(chalk.magenta(`Updating components in space "${spaceId}"`))

  const operations = await plan()

  console.log("Here's the plan:")
  console.log(
    `ADD: \n  -> ${operations.added.map((c) => chalk.green(c.name)).join('\n  -> ') ||
      chalk.gray('noop')}`,
  )
  console.log(
    `UPDATE: \n  -> ${operations.updated.map(([c]) => chalk.cyan(c.name)).join('\n  -> ') ||
      chalk.gray('noop')}`,
  )

  if (yargs.argv.clean) {
    console.log(
      `DELETE: \n  -> ${operations.deleted
        .map((c) => chalk.red(c.name))
        .join('\n  -> ') || chalk.gray('noop')}`,
    )
  } else if (operations.deleted.length > 0) {
    console.log(
      chalk.gray(
        `DELETE: ${chalk.yellow(
          'Warning: Dangling components but running without --clean flag! (the following components will NOT be deleted)',
        )}\n  -> ` +
          operations.deleted.map((c) => chalk.gray(c.name)).join('\n  -> '),
      ),
    )
  }

  if (yargs.argv.plan) {
    return
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

  if (yargs.argv.clean) {
    await Promise.all(
      operations.deleted.map(async (component, index) => {
        // there's a request limit of 4 requests per second, so we need to throttle these updates
        await new Promise((resolve) => {
          setTimeout(resolve, 300 * index)
        })

        await client.delete(
          `/v1/spaces/${spaceId}/components/${component.id}`,
          {
            headers: { authorization },
          },
        )
        console.log(`Deleted ${component.name} (#${component.id})`)
      }),
    )
  }

  await Promise.all(
    operations.added.map(async (component, index) => {
      // there's a request limit of 4 requests per second, so we need to throttle these updates
      await new Promise((resolve) => {
        setTimeout(resolve, 300 * index)
      })

      await client.post(
        `/v1/spaces/${spaceId}/components`,
        { component },
        { headers: { authorization } },
      )
      console.log(`Created new component "${component.name}"`)
    }),
  )

  await Promise.all(
    operations.updated.map(async ([localComponent, remoteComponent], index) => {
      // there's a request limit of 4 requests per second, so we need to throttle these updates
      await new Promise((resolve) => {
        setTimeout(resolve, 300 * index)
      })
      await client.put(
        `/v1/spaces/${spaceId}/components/${remoteComponent.id}`,
        { component: localComponent },
        { headers: { authorization } },
      )
      console.log(`Updated "${localComponent.name}" (#${remoteComponent.id})`)
    }),
  )
}

sync()
  .then(() => {
    if (yargs.argv.plan) {
      return
    }
    console.log(chalk.green('Successfully synced space'))
  })
  .catch((err) => {
    console.error(chalk.red(err))
    process.exitCode = 1
  })
