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
