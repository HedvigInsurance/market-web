import { Container } from 'constate'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { FooterBlock } from '../blocks/FooterBlock'
import { HeaderBlock } from '../blocks/HeaderBlock'
import { BlogPostList } from '../components/BlogPostList'
import { BlogStory } from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'

export const BlogPostsPage: React.FunctionComponent<{ nonce?: string }> = ({
  nonce,
}) => (
  <>
    <Helmet>
      {getMeta({ nonce, title: 'Blogg | Hedvig', fullSlug: 'blog' })}
    </Helmet>
    <HeaderBlock
      is_transparent={false}
      inverse_colors={false}
      _uid={'header'}
      component={'header'}
    />

    <Container<{ blogPosts: ReadonlyArray<BlogStory> }> context="blogPosts">
      {({ blogPosts }) => <BlogPostList stories={blogPosts} />}
    </Container>

    <FooterBlock
      component={'footer'}
      _uid={'footer'}
      color={{
        _uid: 'footer',
        plugin: 'hedvig_limited_color_picker',
        color: 'off-black-dark',
      }}
    />
  </>
)
