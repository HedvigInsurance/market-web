import axios from 'axios'
import { useEffect, useState } from 'react'

export const useIcon = (iconUrl: string) => {
  const [iconString, seticonString] = useState<string>('')

  useEffect(() => {
    const fetchIcon = async () => {
      if (!iconUrl) {
        return
      }
      const iconResponse = await axios.get(iconUrl, {
        withCredentials: false,
      })
      seticonString(iconResponse.data)
    }

    fetchIcon()
  }, [iconUrl])

  return iconString
}
