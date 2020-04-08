import axios from 'axios'
import { useEffect, useState } from 'react'
import { Peril, TypeOfContract } from '../types'

export const usePerils = (insuranceType: TypeOfContract) => {
  const [perils, setPerils] = useState<[] | Peril[]>([])

  const fetchPerils = async () => {
    const url = `https://giraffe.hedvig.com/graphql`

    const data = {
      operationName: 'Perils',
      variables: {
        typeOfContract: insuranceType,
        locale: 'sv_SE',
      },
      query: `
          query Perils($typeOfContract: TypeOfContract!, $locale: Locale!) {
            perils(contractType: $typeOfContract, locale: $locale) {
              title
              description
              covered
              exceptions
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
