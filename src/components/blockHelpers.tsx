import styled from 'react-emotion'

export const SectionWrapper = styled('section')({
  padding: '7rem 0',
})

export const ContentWrapper = styled('div')({
  width: '100%',
  maxWidth: 1200,
  padding: '0 2rem',
  margin: '0 auto',

  '@media (max-width: 480px)': {
    padding: '0 1rem',
  },
})

export const MaxWidthContainerComponent = styled('div')({
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
