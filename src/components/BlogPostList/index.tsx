import * as React from 'react'
import styled from 'react-emotion'
import { BlogStory } from '../../storyblok/StoryContainer'
import { ContentWrapper, SectionWrapper, TABLET_BP_DOWN } from '../blockHelpers'
import { BlogPost } from './BlogPost'

const Headline = styled('h1')({
  margin: 0,
})

const BlogListHeader = styled('div')({
  padding: '6rem 0',
  backgroundImage:
    'linear-gradient(90deg, rgba(0, 0, 0, 0.1) 36.82%, rgba(0, 0, 0, 0.3) 61.71%), radial-gradient(circle at center center, rgba(0, 0, 0, 0) 13%, rgba(0, 0, 0, 0.3) 100%), url(/assets-next/blog/team.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',

  h1: {
    fontSize: '4.5rem',

    [TABLET_BP_DOWN]: {
      fontSize: '3rem',
    },
  },
})

const InnerContentWrapper = styled('div')({
  maxWidth: '50rem',
  margin: '0 auto',
})

export const BlogPostList: React.FunctionComponent<{
  stories: ReadonlyArray<BlogStory>
}> = ({ stories }) => (
  <>
    <BlogListHeader>
      <ContentWrapper>
        <Headline>Blogg</Headline>
      </ContentWrapper>
    </BlogListHeader>
    <SectionWrapper size="sm">
      <ContentWrapper>
        <InnerContentWrapper>
          {stories.map((story, index) => (
            <BlogPost story={story} key={story.id} isFirst={index === 0} />
          ))}
        </InnerContentWrapper>
      </ContentWrapper>
    </SectionWrapper>
  </>
)
