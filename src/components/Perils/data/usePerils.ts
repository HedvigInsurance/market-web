import axios from 'axios'
import { useEffect, useState } from 'react'
import { Locale } from 'utils/CurrentLocale'
import { Peril, TypeOfContract } from '../types'

export const usePerils = (insuranceType: TypeOfContract, locale: Locale) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])

  const fetchPerils = async () => {
    const url = `https://giraffe.hedvig.com/graphql`

    const data = {
      operationName: 'Perils',
      variables: {
        typeOfContract: insuranceType,
        locale,
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
    try {
      const perilsRequest = await axios.post(url, data, {
        withCredentials: false,
        headers: {
          Accept: '*/*',
          'content-type': 'application/json',
        },
      })
      const perilsData = await perilsRequest.data.data.perils
      setPerils(perilsData)
    } catch (e) {
      throw e
    }
  }

  useEffect(() => {
    fetchPerils()
  }, [insuranceType])

  return perils
}
