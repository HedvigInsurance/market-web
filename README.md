# Hedvig Web

Hedvig's storyblok-based website [https://www.hedvig.com](https://www.hedvig.com)

## Prerequisites

- `node`
- `yarn`
- `docker`

For further instructions on managing yarn and node versions, checkout [web contributing guide](https://github.com/HedvigInsurance/tech-stuff/blob/master/web/contributing.md)

## Installation

```sh
# Install dependencies
$ yarn
```

## Development

```sh
# Start redis (docker must be running)
$ docker run --rm -d --name=redis -p 6379:6379 redis

# Start the app
$ yarn watch
```

The app is running on [http://localhost:8030](http://localhost:8030)

## Storybook

We use [Storybook](https://storybook.js.org/) for building new components in isolation.

```sh
# Start Storybook
$ yarn storybook
```

## Storyblok

[Storyblok](https://app.storyblok.com/) is the headless CMS we use for the web

### Managing Storyblok

There's a few tools for deploying spaces (workspaces/backend environments) in Storyblok.

First you must have your own Storyblok account and an personal access token which you can create under
[my account](https://app.storyblok.com/#!/me/account). The personal access token should go into the environment
variable `STORYBLOK_MANAGEMENT_TOKEN`, either in your `.env` file **OR** if you run:

```bash
export STORYBLOK_MANAGEMENT_TOKEN="the personal access token"
```

### Deploy space

To create your own space for local development:

```bash
bin/deploy-space --name "Johans local dev" --domain "http://localhost:8030/"
```

This'll give you back something like this:

```
...
Successfully deployed new space
Gathered facts:
  name=Johans local dev
  domain=http://localhost:8030/
  id=1337
  firstToken=something to keep secret
```

`id` is your space id, use it to manage your space (i.e. when syncing the schema).
`firstToken` is the access token you use to access this space. It should go into the `STORYBLOK_API_TOKEN`
environment variable (in `.env` for example).

**Flags**

- `--name "<awesome name>"` (required) An arbitrary name of your space
- `--domain "<domain>"` (required) The main environment for previewing your content. Notice that you need trailing
  slash (or Storyblok wont't like you later).
- `--duplicate N` A space id to duplicate. With this flag you can duplicate a space, useful if you don't want to start
  from a clean slate.
- `--skip-wait` Skip the 5 second wait before you apply the changes. DONT use this.

### Sync space

To update your space's components with the latest and greatest ones (from `storyblok/components.json`):

```bash
bin/sync-space --space 1337
```

**Flags**

- `--space N` (required) The space id to apply changes to. You can find this in the URL of a space on Storyblok, in the JSON from
  `deploy-space` or on the settings page of the space.
- `--clean` Remove dangling components (components that are in the space but not in the JSON file) - be sure you want
  to do this if you do it!
- `--plan` Basically a dry-run - don't actually apply the changes, just display what will happen.
- `--skip-wait` Don't wait before you apply the changes. DON'T USE THIS. Seriously. There's basically no return if
  you run the sync by accident on a space you shouldn't, while stepping though bash history for example. The 5 seconds
  give you some room to change your mind.

### Fetch space

If you update components in Storyblok, this is your way to get them into the repository. Will overwrite
`storyblok/components.json`. Make sure you do this if you want to get a schema change into production or staging!

```bash
bin/fetch-space --space 1337
```

**Flags**

- `--space N` Your space id to fetch.

### Deploying to staging & prod

`bin/heroku-release` is run on each release, which syncs the schema against the Storyblok space the environment uses.
It does however bail unless the environment variable `SYNC_STORYBLOK_ON_RELEASE` is set to `true` so there's basically
no risk that you accidentally sync a schema for example when setting up a PR instance (unless you set that env var
yourself obv).

### Deploying a Storyblok space to a Heroku PR instance

The PR instance should by default point to staging, but in case you'd want a custom space to toy around with. Make sure
you've set the env var `STORYBLOK_MANAGEMENT_TOKEN`. Then you can run:

```
bin/deploy-space --name "pr-instance-name" --domain "http://localhost:8030/" | bin/connect-app-to-space pr-instance-name
```

You'll get an output similar to:

```
...
Done. Gathered facts:
  id=1337
  name=pr-instance-name
```

As a rule of thumb, always run `sync-space` in the Heroku container:

```
heroku run -a pr-instance-name bin/sync-space --space 1337 --clean --plan
```

#### Why are we not automating this on instance creation?

a) Running 2 commands isn't too bad right? b) 3 real reasons:

1. Destroying things automatically is scary, and we would need to destroy the created spaces on predestroy of the app - possibly only if we changed the space id.
1. Same thing goes for schema sync, we need to know if the space is specific for this app or not.
1. The Heroku container would need ability to modify it's own configuration which seems tricky, and it also needs
   notion of its own metadata which is currently [experimental](https://devcenter.heroku.com/articles/dyno-metadata)
   (<- not a biggie but still).

☝️ Are none of these true anymore? Feel free to automate it!
