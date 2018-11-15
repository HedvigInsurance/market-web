# Hedvig Web

Hedvig's storyblok-based website

## Managing Storyblok

There's a few tools for deploying spaces (workspaces/backend environments) in Storyblok.

First you must have your own Storyblok account and an personal access token which you can create under
  [my account](https://app.storyblok.com/#!/me/account). The personal access token should go into the environment
  variable `STORYBLOK_MANAGEMENT_TOKEN`, either in your `.env` file __OR__ if you run:

```bash
export STORYBLOK_MANAGEMENT_TOKEN="the personal access token"
```


### Deploy space
To create your own space for local local development:
```bash
bin/deploy-space.js --name "Johans local dev" --domain "http://localhost:8030/"
```

This'll give you back something like this:
```json
{"name":"Johans local dev","domain":"http://localhost:8030/","id":1337,"firstToken":"something to keep secret"}
```

`id` is your space id, use it to manage your space (i.e. when syncing the schema).
  `firstToken` is the access token you use to access this space. It should go into the `STORYBLOK_API_TOKEN`
  environment variable (in `.env` for example).

__Flags__
  - `--name "<awesome name>"` (required) An arbitrary name of your space
  - `--domain "<domain>"` (required) The main environment for previewing your content. Notice that you need trailing
    slash (or Storyblok wont't like you later).
  - `--duplicate N` A space id to duplicate. With this flag you can duplicate a space, useful if you don't want to start
    from a clean slate. 
  - `--skip-wait` Skip the 5 second wait before you apply the changes. DONT use this.


### Sync space
To update your space's components with the latest and greatest ones (from `storyblok/components.json`):
```bash
bin/sync-space.js --space 1337
```

__Flags__
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
bin/fetch-space.js --space 1337
```

__Flags__
  - `--space N` Your space id to fetch.
