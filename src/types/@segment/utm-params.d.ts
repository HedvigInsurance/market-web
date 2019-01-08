declare module '@segment/utm-params' {
  interface UtmParams {
    (query: string): Record<string, any>
    strict: (query: string) => Record<string, any>
  }
  const utmParams: UtmParams
  export = utmParams
}
