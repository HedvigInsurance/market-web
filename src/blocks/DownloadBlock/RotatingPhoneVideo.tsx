import * as React from 'react'
import styled from 'react-emotion'

const Video = styled('video')({
  maxWidth: 300,
  width: '100%',
  '@media (min-width: 1024px)': {
    maxWidth: 450,
  },
})

const baseVideoUrl = 'https://cdn.hedvig.com/www/rotating-phone-video'

export const RotatingPhoneVideo: React.SFC = () => (
  <Video autoPlay loop muted playsInline>
    <source
      src={`${baseVideoUrl}/hedvig_rotating_phone.m3u8`}
      type="application/vnd.apple.mpegurl"
    />
    <source src={`${baseVideoUrl}/web.mp4`} />
    <source src={`${baseVideoUrl}/web.webm`} />
  </Video>
)
