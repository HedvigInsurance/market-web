import styled from '@emotion/styled'
import { colors, fonts } from '@hedviginsurance/brand'
import React from 'react'
import Helmet from 'react-helmet-async'
import { DeferredImage } from 'components/DeferredImage'
import { FooterBlock } from '../blocks/FooterBlock/FooterBlock'
import { HeaderBlockBrandPivot } from '../blocks/HeaderBlockBrandPivot'
import {
  ContentWrapper,
  MOBILE_BP_DOWN,
  MOBILE_BP_UP,
  SectionWrapper,
} from '../components/blockHelpers'
import { PrevNextCard } from '../components/BlogPost/PrevNextCard'
import { BlogPostAuthor } from '../components/BlogPostAuthor'
import { TagList } from '../components/BlogPostList/BlogPost'
import { Breadcrumb, Breadcrumbs } from '../components/Breadcrumbs'
import { ButtonLink } from '../components/buttons'
import { BlogPostsContainer } from '../components/containers/BlogPostsContainer'
import { UserContainer } from '../components/containers/UserContainer'
import { BlogStory, StoryContainer } from '../storyblok/StoryContainer'
import { findAuthor } from '../utils/author'
import { getMeta } from '../utils/meta'
import { getStoryblokImage } from '../utils/storyblok'
import { truncate } from '../utils/truncate'

const TopImageWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxHeight: '40vh',
  overflow: 'hidden',
})
const TopImage = styled(DeferredImage)({
  width: '100%',
})

const ArticleWrapper = styled('article')({
  maxWidth: '50rem',
  margin: 'auto',

  '& img': {
    width: '100%',
    margin: '1.25rem 0',
  },

  '& blockquote': {
    backgroundColor: colors.PINK_LIGHT,
    borderRadius: 10,
    padding: '1.5rem',
    fontFamily: fonts.GEOMANIST,
    fontSize: '2rem',
    lineHeight: 1.5,
    margin: '3rem 0',

    '@media (min-width: 797px)': {
      fontSize: '2.5rem',
      padding: '3rem',
    },

    p: {
      margin: 0,
      lineHeight: 'inherit',
    },
  },
})

const BreadcrumbsWrapper = styled('div')({
  paddingBottom: '1rem',
})

const CtaWrapper = styled('div')({
  padding: '3rem 0',
  textAlign: 'center',

  [MOBILE_BP_DOWN]: {
    paddingTop: '1.5rem',
  },
})

const PrevNextWrapper = styled(ContentWrapper)({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  maxWidth: '50rem',
  margin: 'auto',

  [MOBILE_BP_DOWN]: {
    padding: 0,
  },
})

const PrevNextSection = styled('div')({
  backgroundColor: colors.LIGHT_GRAY,
  [MOBILE_BP_UP]: {
    paddingTop: '5rem',
    paddingBottom: '5rem',
  },
})

export const BlogPostPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <StoryContainer<BlogStory>>
    {({ story }) => {
      if (!story) {
        throw new Error('No story found ')
      }
      return (
        <>
          <Helmet>{getMeta({ story, nonce })}</Helmet>

          <HeaderBlockBrandPivot
            is_transparent={false}
            inverse_colors={false}
            _uid="header"
            component="blog"
          />

          {story.content.top_image && (
            <TopImageWrapper>
              <TopImage src={getStoryblokImage(story.content.top_image)} />
            </TopImageWrapper>
          )}
          <SectionWrapper size="sm">
            <ContentWrapper>
              <ArticleWrapper>
                <BreadcrumbsWrapper>
                  <Breadcrumbs>
                    <Breadcrumb href="/blog">Blogg</Breadcrumb>
                    <Breadcrumb>
                      {truncate(25)(story.content.title || '')}
                    </Breadcrumb>
                  </Breadcrumbs>
                </BreadcrumbsWrapper>

                <h1>{story.content.title}</h1>

                <UserContainer>
                  {({ users }) => {
                    const author = findAuthor(users, story.content.author)
                    if (!author) {
                      return null
                    }

                    return (
                      <BlogPostAuthor
                        author={author}
                        date={story.first_published_at}
                      />
                    )
                  }}
                </UserContainer>

                <div
                  dangerouslySetInnerHTML={{
                    __html: story.content.content && story.content.content.html,
                  }}
                />

                {story.content.show_cta && (
                  <CtaWrapper>
                    <ButtonLink href={story.content.cta_target}>
                      {story.content.cta_label}
                    </ButtonLink>
                  </CtaWrapper>
                )}

                <TagList tagList={story.tag_list} />
              </ArticleWrapper>
            </ContentWrapper>
          </SectionWrapper>

          <BlogPostsContainer>
            {({ blogPosts }) => {
              const index =
                blogPosts && blogPosts.findIndex(({ id }) => id === story.id)
              return (
                <PrevNextSection>
                  <PrevNextWrapper>
                    <PrevNextCard
                      story={
                        index >= 0 && blogPosts[index + 1]
                          ? blogPosts[index + 1]
                          : undefined
                      }
                      phoneCardDirection="Föregående inlägg"
                      background="#f9fafc"
                    />
                    <PrevNextCard
                      story={
                        index >= 0 && blogPosts[index - 1]
                          ? blogPosts[index - 1]
                          : undefined
                      }
                      phoneCardDirection="Nästa inlägg"
                      background="#f3f4f7"
                    />
                  </PrevNextWrapper>
                </PrevNextSection>
              )
            }}
          </BlogPostsContainer>

          <FooterBlock
            component="blog"
            _uid="footer"
            color={{
              _uid: 'footer',
              color: 'standard-inverse',
              plugin: 'hedvig_minimal_color_picker',
            }}
          />
        </>
      )
    }}
  </StoryContainer>
)
