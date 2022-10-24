export enum Features {
  AbRedirects = 'AB_REDIRECTS',
}

export const isFeatureEnabled = (feature: Features) => {
  const envVar = `FEATURE_${feature}`
  const falsyValues = ['0', 'false']
  const envVal = (process.env[envVar] ?? '').trim()
  return !!envVal && !falsyValues.includes(envVal)
}
