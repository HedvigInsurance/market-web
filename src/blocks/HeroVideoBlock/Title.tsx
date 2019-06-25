import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { animated, config, Spring } from 'react-spring'
import { AppLink } from '../../components/AppLink'
import { MOBILE_BP_DOWN } from '../../components/blockHelpers'

const PlayIcon: React.FunctionComponent<{ className?: string }> = ({
  className,
}) => (
  <svg
    width={50}
    height={50}
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M55.5 28c0 15.188-12.312 27.5-27.5 27.5S.5 43.188.5 28 12.812.5 28 .5 55.5 12.812 55.5 28z"
      stroke="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M39.439 26.941L21.534 16.137C20.829 15.712 20 16.33 20 17.28v21.44c0 .95.829 1.569 1.534 1.144L39.439 29.06c.748-.45.748-1.667 0-2.118z"
      fill="#fff"
    />
  </svg>
)

const PlayButtonIcon = styled(PlayIcon)({
  marginRight: '1rem',
})

const MissionTitle = styled(animated.span)({
  color: 'white',
  fontSize: '30px',
  lineHeight: '40px',
})

const Mission = styled(animated.h1)({
  color: 'white',
  fontSize: '40px',
  lineHeight: '55px',
  maxWidth: '80%',
  '@media (min-width: 500px)': {
    fontSize: '50px',
    lineHeight: '70px',
  },
  '@media (min-width: 700px)': {
    fontSize: '60px',
    lineHeight: '70px',
  },
  '@media (min-width: 1100px)': {
    fontSize: '90px',
    lineHeight: '100px',
  },
})

const ButtonsWrapper = styled('div')({
  display: 'flex',
  marginTop: '2rem',
  alignItems: 'center',
  flexWrap: 'wrap',
})

const PlayButtonContainer = styled('div')({
  display: 'inline-block',
  maxWidth: 300,
  paddingRight: '1rem',
  paddingBottom: '1rem',
  transition: 'transform 350ms',
  ':active': {
    transform: 'scale(0.9)',
  },
})

const PlayButton = styled(animated.button)({
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  textShadow: 'inherit',
  justifyContent: 'space-between',
  background: 'transparent',
  border: 0,
  width: '100%',
  cursor: 'pointer',
  fontSize: 'inherit',
  ':focus': {
    outline: 0,
  },
  [MOBILE_BP_DOWN]: {
    marginTop: '.5rem',
  },
})

const CtaWrapper = styled('div')({
  paddingBottom: '1rem',
})
const Cta = styled(animated.a)({
  display: 'inline-block',
  borderRadius: 30,
  border: `2px solid ${colors.PURPLE}`,
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: 'inherit',
  cursor: 'pointer',
  padding: '1rem 2rem',
  textShadow: 'none',

  backgroundColor: colors.PURPLE,
  borderColor: colors.PURPLE,
  color: colors.WHITE,
  whiteSpace: 'nowrap',

  '&:hover, &:focus': {
    backgroundColor: colors.PURPLE,
    borderColor: colors.PURPLE,
    color: colors.WHITE,
  },
})

const DELAY = 500

interface TitleProps {
  clickedPlayButton: () => void
  headline: string
  title: string
  playButtonText: string
  ctaText: string
}

export const Title: React.FunctionComponent<TitleProps> = ({
  headline,
  title,
  playButtonText,
  clickedPlayButton,
  ctaText,
}) => (
  <>
    <Spring
      native
      delay={DELAY + 200}
      config={config.slow}
      from={{ opacity: 0, transform: 'translateX(-300px)' }}
      to={{ opacity: 1, transform: 'translateX(0)' }}
    >
      {(styles) => <MissionTitle style={styles}>{headline}</MissionTitle>}
    </Spring>
    <Spring
      native
      delay={DELAY}
      config={config.slow}
      from={{ opacity: 0, transform: 'translateY(-300px)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {(styles) => <Mission style={styles}>{title}</Mission>}
    </Spring>
    <Spring
      native
      delay={DELAY + 900}
      config={config.slow}
      from={{ opacity: 0, transform: 'translateY(50px)' }}
      to={{ opacity: 1, transform: 'translateY(0)' }}
    >
      {(styles) => (
        <ButtonsWrapper>
          <PlayButtonContainer>
            <PlayButton onClick={clickedPlayButton} style={styles}>
              <PlayButtonIcon />
              {playButtonText}
            </PlayButton>
          </PlayButtonContainer>
          {ctaText && (
            <CtaWrapper>
              <AppLink>
                {({ link, handleClick }) => (
                  <Cta href={link} onClick={handleClick} style={styles}>
                    {ctaText}
                  </Cta>
                )}
              </AppLink>
            </CtaWrapper>
          )}
        </ButtonsWrapper>
      )}
    </Spring>
  </>
)
