import { getStoryblokApi } from '@storyblok/react'
import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useLocale } from 'context/LocaleContext'
import { ContentWrapper, SectionWrapper } from 'components/blockHelpers'
import { ArticleStory } from 'src/storyblok/StoryContainer'
import { Button } from 'components/Button/Button'
import { BaseBlockProps } from '../BaseBlockProps'
import { ArticleTeaser } from './ArticleTeaser'

type ArticleListBlockProps = BaseBlockProps & {
  category?: string
}

export const ArticleListBlock = ({ category }: ArticleListBlockProps) => {
  const {
    currentLocale: { label },
  } = useLocale()
  const [articles, setArticles] = useState<ArticleStory[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const pageSize = 6

  useEffect(() => {
    const getArticles = async () => {
      try {
        const storyblokApi = getStoryblokApi()
        const { data, total } = await storyblokApi.get(`cdn/stories/`, {
          starts_with: `${label}/`,
          content_type: 'article',
          resolve_relations: 'article.categories',
          per_page: pageSize,
          page: page,
          ...(category && {
            filter_query: {
              categories: {
                in_array: category,
              },
            },
          }),
        })

        const totalPages = Math.ceil(total / pageSize)
        setTotalPages(totalPages)
        setArticles((previousArticles) => {
          return [...previousArticles, ...data.stories]
        })
      } catch (error) {
        setArticles([])
      }
    }
    getArticles()
  }, [label, category, page])

  const handleClick = () => {
    setPage((prev) => prev + 1)
  }

  return (
    <SectionWrapper size="md" brandPivot>
      <Wrapper brandPivot>
        <Grid>
          {articles.map((article: ArticleStory) => (
            <Link key={article.uuid} href={`/${article.full_slug}`}>
              <ArticleTeaser {...article.content} />
            </Link>
          ))}
        </Grid>
        {page < totalPages && (
          // TODO: Translate button label
          <Button onClick={handleClick}>Fler nyheter</Button>
        )}
      </Wrapper>
    </SectionWrapper>
  )
}

const Wrapper = styled(ContentWrapper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  max-width: 84rem;
  min-height: 60vh;
  margin-inline: auto;
`

const Grid = styled.div`
  display: grid;
  grid-gap: 4rem 1.5rem;
  grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
  /* Zooming in Safari caused rows to be larger than the content */
  grid-template-rows: max-content;
  width: 100%;
`
const Link = styled.a`
  display: grid;
  grid-template-rows: max-content 1fr;
  gap: 0.5rem;
  text-decoration: none;
`
