import axios from 'axios'
import { useEffect, useState } from 'react'
import { LocaleData } from 'l10n/locales'
import { Peril, TypeOfContract } from '../types'

type Locale = LocaleData['iso']

const getGiraffeEndpoint = (): string => {
  if (
    typeof window === 'undefined' &&
    typeof process !== 'undefined' &&
    process.env.GIRAFFE_ENDPOINT
  ) {
    return process.env.GIRAFFE_ENDPOINT
  }

  return (window as any).GIRAFFE_ENDPOINT
}

const perilsQuery = `
query Perils($typeOfContract: TypeOfContract!, $localeIso: Locale!) {
  contractPerils(contractType: $typeOfContract, locale: $localeIso) {
      title
      description
      covered
      info
      icon {
        variants {
          light {
            svgUrl
          }
        }
      }
    }
  }
`

export const usePerils = (
  insuranceTypes: TypeOfContract[],
  localeIso: Locale,
) => {
  const [perils, setPerils] = useState<[] | Peril[][]>([])

  useEffect(() => {
    const fetchPerils = async () => {
      const url = getGiraffeEndpoint()
      const perilsArray: Peril[][] = []

      await Promise.all(
        insuranceTypes.map(async (insuranceType) => {
          const data = {
            operationName: 'Perils',
            variables: {
              typeOfContract: insuranceType,
              localeIso,
            },
            query: perilsQuery,
          }

          const perilsRequest = await axios.post(url, data, {
            withCredentials: false,
            headers: {
              Accept: '*/*',
              'content-type': 'application/json',
            },
          })

          perilsArray.push(perilsRequest.data.data.contractPerils)
        }),
      )
      setPerils(perilsArray)
    }

    fetchPerils()
  }, [])

  return perils
}
