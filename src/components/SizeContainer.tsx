import styled from 'react-emotion'

export const SizeContainer = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1240px',
  paddingLeft: '20px',
  paddingRight: '20px',
  '&:before': {
    content: ' ',
    display: 'table',
  },
  '&:after': {
    clear: 'both',
  },
})
