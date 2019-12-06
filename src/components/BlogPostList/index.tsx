import styled from '@emotion/styled'
import * as React from 'react'
import { BlogStory } from '../../storyblok/StoryContainer'
import { ContentWrapper, SectionWrapper } from '../blockHelpers'
import { Breadcrumb, Breadcrumbs } from '../Breadcrumbs'
import { BlogPost } from './BlogPost'

const InnerContentWrapper = styled('div')({
  maxWidth: '50rem',
  margin: '0 auto',
})

export const BlogPostList: React.FunctionComponent<{
  tag?: string
  stories: ReadonlyArray<BlogStory>
}> = ({ tag, stories }) => (
  <>
    <SectionWrapper size="sm">
      <ContentWrapper>
        <InnerContentWrapper>
          {tag && (
            <>
              <Breadcrumbs>
                <Breadcrumb href={'/blog'}>Blogg</Breadcrumb>
                <Breadcrumb>Taggar</Breadcrumb>
                <Breadcrumb>{tag}</Breadcrumb>
              </Breadcrumbs>
              <h1>Inlägg taggade med {tag}</h1>
            </>
          )}
          {stories.map((story, index) => (
            <BlogPost story={story} key={story.id} isFirst={index === 0} />
          ))}
        </InnerContentWrapper>
      </ContentWrapper>
    </SectionWrapper>
  </>
)
