import styled from '@emotion/styled'
import React from 'react'
import Helmet from 'react-helmet-async'
import { FooterBlock } from '../blocks/FooterBlock/FooterBlock'
import { HeaderBlockBrandPivot } from '../blocks/HeaderBlockBrandPivot'
import { ContentWrapper, TABLET_BP_DOWN } from '../components/blockHelpers'
import { BlogPostList } from '../components/BlogPostList'
import { BlogPostsContainer } from '../components/containers/BlogPostsContainer'
import { getMeta } from '../utils/meta'

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

export const BlogPostsPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <>
    <Helmet>
      {getMeta({ nonce, title: 'Blogg | Hedvig', fullSlug: 'blog' })}
    </Helmet>
    <HeaderBlockBrandPivot
      is_transparent={false}
      inverse_colors={false}
      _uid="header"
      component={'header'}
    />

    <BlogListHeader>
      <ContentWrapper>
        <Headline>Blogg</Headline>
      </ContentWrapper>
    </BlogListHeader>

    <BlogPostsContainer>
      {({ blogPosts }) => <BlogPostList stories={blogPosts} />}
    </BlogPostsContainer>

    <FooterBlock
      component={'footer'}
      _uid={'footer'}
      color={{
        _uid: 'footer',
        color: 'standard-inverse',
        plugin: 'hedvig_minimal_color_picker',
      }}
    />
  </>
)
