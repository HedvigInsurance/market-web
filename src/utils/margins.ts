export type Margins = {
  // margin-left and margin-right
  mx?: string
  // margin-top and margin-bottom
  my?: string
  // margin-left
  ml?: string
  // margin-right
  mr?: string
  // margin-top
  mt?: string
  // margin-bottom
  mb?: string
  // all margins
  m?: string
}

export const getMargins = (margins: Margins) => {
  return {
    ...(margins.m && { margin: margins.m }),
    ...(margins.my && { marginTop: margins.my, marginBottom: margins.my }),
    ...(margins.mt && { marginTop: margins.mt }),
    ...(margins.mb && { marginBottom: margins.mb }),
    ...(margins.mx && { marginLeft: margins.mx, marginRight: margins.mx }),
    ...(margins.ml && { marginLeft: margins.ml }),
    ...(margins.mr && { marginRight: margins.mr }),
  }
}
