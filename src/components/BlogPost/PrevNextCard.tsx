import { colors } from '@hedviginsurance/brand'
import * as React from 'react'
import styled from 'react-emotion'
import { BlogStory } from '../../storyblok/StoryContainer'
import { truncate } from '../../utils/truncate'
import { MOBILE_BP_UP } from '../blockHelpers'

interface Props {
  phoneCardDirection: string
  background: string
  story?: BlogStory
}

const Card = styled('div')({
  overflow: 'hidden',
  maxWidth: 350,
  display: 'none',
  justifyContent: 'space-between',
  backgroundColor: colors.WHITE,
  borderRadius: 16,
  boxShadow: [
    '0 1px 5px 0 rgba(0, 0, 0, 0.2)',
    '0 2px 2px 0 rgba(0, 0, 0, 0.14)',
    '0 3px 1px -2px rgba(0, 0, 0, 0.12)',
  ].join(),
  [MOBILE_BP_UP]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
})

const CardHeader = styled('div')({
  margin: '1.5rem',
  marginBottom: 0,
})

const CardBody = styled('div')({
  margin: '1.5rem',
})

const PHONE_UP = '@media (min-width: 480px)'

const CardLink = styled('a')(({ background }: { background: string }) => ({
  background,
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: '1rem',
  width: '100%',
  textDecoration: 'none',
  [PHONE_UP]: {
    width: '50%',
    background: 'transparent',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 0,
    '&:first-child': {
      paddingRight: '1rem',
    },
    '&:last-child': {
      paddingLeft: '1rem',
    },
  },
}))

const CardDirection = styled('div')({
  [PHONE_UP]: {
    paddingBottom: '1.25rem',
  },
  fontSize: '.9rem',
})

const CardImage = styled('img')({
  maxWidth: '100%',
})

const ImagePlaceholder = styled('div')({
  width: '100%',
  paddingTop: '60%',
  background: '#f3f4f7',
})

const CardTitle = styled('h3')({
  fontWeight: 'bold',
})

const ReadMoreLink = styled('span')({
  color: colors.PURPLE,
})

const PhonelessSpacing = styled('div')({
  display: 'none',
  width: '50%',
  [MOBILE_BP_UP]: {
    display: 'block',
  },
})

export const PrevNextCard: React.FunctionComponent<Props> = ({
  story,
  phoneCardDirection,
  background,
}) =>
  story ? (
    <CardLink href={'/' + story.full_slug} background={background}>
      <CardDirection>{phoneCardDirection}</CardDirection>
      <Card>
        <div>
          {story.content.top_image ? (
            <CardImage src={story.content.top_image} />
          ) : (
            <ImagePlaceholder />
          )}

          <CardHeader>
            <CardTitle>{truncate(25)(story.content.title || '')}</CardTitle>
            <p>{story.content.excerpt}</p>
          </CardHeader>
        </div>
        <CardBody>
          <ReadMoreLink>Läs inlägget</ReadMoreLink>
        </CardBody>
      </Card>
    </CardLink>
  ) : (
    <PhonelessSpacing />
  )
