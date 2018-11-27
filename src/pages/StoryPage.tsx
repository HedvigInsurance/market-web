import * as React from 'react'
import Helmet from 'react-helmet-async'
import { getBlockComponent } from '../blocks'
import { BodyStory, StoryContainer } from '../storyblok/StoryContainer'

const getBlocksOrDefault = (story: BodyStory) =>
  (story && story.content && story.content.body) || []

export const StoryPage: React.FunctionComponent = () => (
  <StoryContainer>
    {({ story }) => (
      <>
        <Helmet>
          <title>{story.name}</title>
          {typeof window === 'undefined' && (
            <link
              rel="canonical"
              href={`${process.env.HOST}/${story.full_slug.replace(
                /\/?home$/,
                '',
              )}`}
            />
          )}
          {story.content.robots && (
            <meta name="robots" content={story.content.robots} />
          )}
          {story.content.seo_meta_title && (
            <meta name="title" content={story.content.seo_meta_title} />
          )}
          {story.content.seo_meta_description && (
            <meta
              name="description"
              content={story.content.seo_meta_description}
            />
          )}
          {story.content.seo_meta_og_title && (
            <meta
              property="og:title"
              content={story.content.seo_meta_og_title}
            />
          )}
          {story.content.seo_meta_og_description && (
            <meta
              property="og:description"
              content={story.content.seo_meta_og_description}
            />
          )}
          {story.content.seo_meta_og_image && (
            <meta
              property="og:image"
              content={story.content.seo_meta_og_image}
            />
          )}
        </Helmet>

        {getBlocksOrDefault(story).map((block) => {
          const BlockComponent = getBlockComponent(block.component)
          if (!BlockComponent) {
            return null
          }

          return <BlockComponent key={block._uid} {...block} />
        })}
      </>
    )}
  </StoryContainer>
)
