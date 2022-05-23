import { Peril } from './types'

export const isDisabledPeril = (perils: Peril[], peril: Peril) => {
  return !perils.some((p) => p.title === peril.title)
}

export const getPerilsComparison = (perilsGroup: Peril[][]) => {
  const uniquePerils = perilsGroup
    .reduce((accumulated, perils) => accumulated.concat(perils), [])
    .filter(
      (peril, index: number, allPerils) =>
        allPerils.findIndex((p) => p.title === peril.title) === index,
    )

  const perilsWithDisabledField = perilsGroup.map((perils) => {
    return uniquePerils.map((peril) => ({
      ...peril,
      disabled: isDisabledPeril(perils, peril),
    }))
  })

  return perilsWithDisabledField
}
