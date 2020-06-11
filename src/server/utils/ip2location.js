const ip2location = require('ip2location-nodejs')
const path = require('path')
const fs = require('fs')

const NOOP_FN = () => {
  return null
}

const createIp2LocationCountryLookup = (filePath) => {
  const binPath = path.resolve(__dirname, filePath)
  if (!fs.existsSync(binPath)) {
    console.error(
      "ip2location database dosen't exist, using noop function for geolocation lookup",
    )
    return NOOP_FN
  }

  try {
    ip2location.IP2Location_init(binPath)
  } catch (e) {
    console.error(
      'failed to init ip2location database, using noop function for geolocation lookup',
      e,
    )
    return NOOP_FN
  }

  return (ip) => {
    try {
      const country = ip2location.IP2Location_get_country_short(ip)
      return country === '?' || country === '-' ? null : country || null
    } catch (e) {
      console.error('Failed to lookup country from location', e)
      return null
    }
  }
}

module.exports = {
  createIp2LocationCountryLookup,
  lookupCountry: createIp2LocationCountryLookup(
    '../bin/ip2location/IP2LOCATION-LITE-DB1.BIN', // relative path from '/build'
  ),
}
