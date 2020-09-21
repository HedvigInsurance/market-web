import axios from 'axios'
import { useEffect, useState } from 'react'
import { LocaleData } from 'utils/locales'
import { Peril, TypeOfContract } from '../types'

export const usePerils = (
  insuranceType: TypeOfContract,
  localeIso: LocaleData['iso'],
) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])

  const fetchPerils = async () => {
    const url = `https://giraffe.hedvig.com/graphql`

    const data = {
      operationName: 'Perils',
      variables: {
        typeOfContract: insuranceType,
        localeIso,
      },
      query: `
          query Perils($typeOfContract: TypeOfContract!, $locale: Locale!) {
            perils(contractType: $typeOfContract, locale: $locale) {
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

  useEffect(() => {
    fetchPerils()
  }, [insuranceType])

  return perils
}
