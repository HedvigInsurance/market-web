import { getStoryblokApi } from '@storyblok/react'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useLocale } from 'context/LocaleContext'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import { ArticleStory } from 'src/storyblok/StoryContainer'
import { BaseBlockProps } from '../BaseBlockProps'
import { ArticleTeaser } from './ArticleTeaser'

type ArticleListBlockProps = BaseBlockProps & {
  category?: string
}

export const ArticleListBlock = ({ category }: ArticleListBlockProps) => {
  const {
    currentLocale: { label },
  } = useLocale()
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const getArticles = async () => {
      try {
        const storyblokApi = getStoryblokApi()
        const { data } = await storyblokApi.get(`cdn/stories/`, {
          starts_with: `${label}`,
          content_type: 'article',
          resolve_relations: 'article.categories',
          ...(category && {
            filter_query: {
              categories: {
                in_array: category,
              },
            },
          }),
        })

        setArticles(data.stories)
      } catch (error) {
        setArticles([])
      }
    }
    getArticles()
  }, [label, category])

  return (
    <SectionWrapper brandPivot>
      <Wrapper brandPivot>
        <Grid>
          {articles.map((article: ArticleStory) => (
            <Link key={article.uuid} href={`/${article.full_slug}`}>
              <ArticleTeaser {...article.content} />
            </Link>
          ))}
        </Grid>
      </Wrapper>
    </SectionWrapper>
  )
}

const Wrapper = styled(ContentWrapper)`
  max-width: 84rem;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
`
const Link = styled.a`
  text-decoration: none;
`
