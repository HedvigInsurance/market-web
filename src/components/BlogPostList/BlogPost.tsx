import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import React from 'react'
import { DeferredImage } from 'components/DeferredImage'
import { BlogStory } from '../../storyblok/StoryContainer'
import { findAuthor } from '../../utils/author'
import { getStoryblokImage } from '../../utils/storyblok'
import { Badge } from '../Badge'
import { BlogPostAuthor } from '../BlogPostAuthor'
import { UserContainer } from '../containers/UserContainer'

const Wrapper = styled('div')<{ first: boolean }>(({ first }) => ({
  padding: '3rem 0',
  borderTop: first ? undefined : `1px solid ${colors.LIGHT_GRAY}`,
}))

const Image = styled(DeferredImage)({
  maxWidth: '100%',
  borderRadius: 8,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
})

const PlainLink = styled('a')({
  textDecoration: 'none',
})

const ReadMoreWrapper = styled('div')({
  paddingTop: '3rem',
})
const ReadMoreLink = styled('a')({
  textDecoration: 'none',
  color: colors.PURPLE,
})

export const TagList: React.FunctionComponent<{
  tagList?: ReadonlyArray<string>
}> = ({ tagList }) => (
  <>
    {tagList &&
      tagList.map((tag) => (
        <PlainLink href={`/blog/tags/${encodeURIComponent(tag)}`} key={tag}>
          <Badge>{tag}</Badge>
        </PlainLink>
      ))}
  </>
)

export const BlogPost: React.FunctionComponent<{
  story: BlogStory
  isFirst: boolean
}> = ({ story, isFirst }) => (
  <Wrapper first={isFirst}>
    <UserContainer>
      {({ users }) => {
        const author = findAuthor(users, story.content.author)
        if (!author) {
          return null
        }

        return (
          <BlogPostAuthor author={author} date={story.first_published_at} />
        )
      }}
    </UserContainer>

    <Image src={getStoryblokImage(story.content.top_image)} />

    <PlainLink href={`/${story.full_slug}`}>
      <h2>{story.content.title}</h2>
    </PlainLink>

    <p>{story.content.excerpt}</p>

    <TagList tagList={story.tag_list} />

    <ReadMoreWrapper>
      <ReadMoreLink href={`/${story.full_slug}`}>Läs inlägget</ReadMoreLink>
    </ReadMoreWrapper>
  </Wrapper>
)
