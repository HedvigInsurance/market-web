import { Container } from 'constate'
import * as React from 'react'
import Helmet from 'react-helmet-async'
import { RouteComponentProps, withRouter } from 'react-router'
import { FooterBlock } from '../blocks/FooterBlock'
import { HeaderBlock } from '../blocks/HeaderBlock'
import { BlogPostList } from '../components/BlogPostList'
import { BlogStory } from '../storyblok/StoryContainer'
import { getMeta } from '../utils/meta'

export const BlogPostsTagPageComponent: React.FunctionComponent<
  { nonce?: string } & RouteComponentProps<{ tag: string }>
> = ({ nonce, match, staticContext }) => (
  <>
    <Helmet>
      {getMeta({
        nonce,
        title: `Inlägg taggade med ${match.params.tag} | Hedvig`,
        fullSlug: `blog/${encodeURIComponent(match.params.tag)}`,
      })}
    </Helmet>
    <HeaderBlock
      is_transparent={false}
      inverse_colors={false}
      _uid={'header'}
      component={'header'}
    />
    <Container<{ blogPosts: ReadonlyArray<BlogStory> }> context="blogPosts">
      {({ blogPosts }) => {
        if (blogPosts.length === 0 && staticContext) {
          staticContext.statusCode = 404
        }
        return <BlogPostList tag={match.params.tag} stories={blogPosts} />
      }}
    </Container>
    }
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
export const BlogPostsTagPage = withRouter(BlogPostsTagPageComponent)
