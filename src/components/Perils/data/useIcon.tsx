import axios from 'axios'
import { useEffect, useState } from 'react'

export const useIcon = (iconUrl: string) => {
  const [iconString, seticonString] = useState<string>('')

  useEffect(() => {
    const fetchIcon = async () => {
      if (!iconUrl) {
        return
      }
      const url = `https://giraffe.hedvig.com${iconUrl}`
      const iconResponse = await axios.get(url, {
        withCredentials: false,
      })
      seticonString(iconResponse.data)
    }

    fetchIcon()
  }, [iconUrl])

  return iconString
}
