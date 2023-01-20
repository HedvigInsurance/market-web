import styled from '@emotion/styled'
import { colorsV3 } from '@hedviginsurance/brand'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { getStoryblokLinkUrl } from 'utils/storyblok'
import { GlobalStoryContainer } from 'storyblok/StoryContainer'
import { removeTrailingSlash } from 'utils/meta'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const CategoriesList = styled.nav`
  display: inline-flex;
  gap: 2rem;
  border-bottom: 2px solid ${colorsV3.gray300};
`

const CategoriesItem = styled.a<{ active: boolean }>`
  position: relative;
  padding: 0.25rem 0.5rem;
  font-size: 1.5rem;
  color: ${colorsV3.gray500};
  text-decoration: none;

  ${({ active }) =>
    active &&
    `
      color: ${colorsV3.gray900};
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        display: block;
        width: 100%;
        height: 2px;
        background-color: ${colorsV3.gray900};
      }`}
`

export const ArticleMenuBlock = () => {
  const location = useLocation()
  return (
    <Wrapper>
      <GlobalStoryContainer>
        {({ globalStory }) => (
          <CategoriesList>
            {globalStory.content.blog_menu?.map((menuItem) => {
              const url = getStoryblokLinkUrl(menuItem.link)
              return (
                <CategoriesItem
                  key={menuItem.label}
                  href={url}
                  active={removeTrailingSlash(url) === location.pathname}
                >
                  {menuItem.label}
                </CategoriesItem>
              )
            })}
          </CategoriesList>
        )}
      </GlobalStoryContainer>
    </Wrapper>
  )
}
