import axios from 'axios'
import { useEffect, useState } from 'react'
import { LocaleData } from 'utils/locales'
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

export const usePerils = (insuranceType: TypeOfContract, localeIso: Locale) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])

  useEffect(() => {
    const fetchPerils = async () => {
      const url = getGiraffeEndpoint()

      const data = {
        operationName: 'Perils',
        variables: {
          typeOfContract: insuranceType,
          localeIso,
        },
        query: `
          query Perils($typeOfContract: TypeOfContract!, $localeIso: Locale!) {
            perils(contractType: $typeOfContract, locale: $localeIso) {
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
          `,
      }
      const perilsRequest = await axios.post(url, data, {
        withCredentials: false,
        headers: {
          Accept: '*/*',
          'content-type': 'application/json',
        },
      })
      const perilsData = perilsRequest.data.data.perils
      setPerils(perilsData)
    }

    fetchPerils()
  }, [insuranceType, localeIso])

  return perils
}
