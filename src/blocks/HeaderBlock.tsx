import { colors } from '@hedviginsurance/brand'
import { Container } from 'constate'
import * as React from 'react'
import styled from 'react-emotion'
import { ContentWrapper } from '../components/blockHelpers'
import { HedvigWordmark } from '../components/icons/HedvigWordmark'
import { GlobalStory } from '../storyblok/StoryContainer'
import { BaseBlockProps } from './BaseBlockProps'

const WRAPPER_HEIGHT_ISH = '4.5rem'
const Wrapper = styled('div')(({ transparent }: { transparent: boolean }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  ...(transparent
    ? {}
    : {
        backgroundColor: colors.WHITE,
        boxShadow:
          '0px 1px 2px rgba(0, 0, 0, 0.1), 0px 2px 5px rgba(0, 0, 0, 0.1)',
      }),
}))
const Filler = styled('div')({
  height: WRAPPER_HEIGHT_ISH,
})

const InnerHeaderWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '1.4rem 0',
})
const Menu = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

interface HeaderBlockProps extends BaseBlockProps {
  is_transparent: boolean
}

export const HeaderBlock: React.FunctionComponent<HeaderBlockProps> = ({
  is_transparent,
}) => (
  <>
    {!is_transparent && <Filler />}
    <Container<{ story: GlobalStory }> context="globalStory">
      {({ story }) => (
        <Wrapper transparent={is_transparent}>
          <ContentWrapper>
            <InnerHeaderWrapper>
              <HedvigWordmark height={30} />

              <Menu>
                {(story.content.header_menu_items || []).map((menuItem) => (
                  <a
                    key={menuItem._uid}
                    href={
                      menuItem.link.linktype === 'story'
                        ? `/${menuItem.link.cached_url}`
                        : menuItem.link.cached_url
                    }
                  >
                    {menuItem.label}
                  </a>
                ))}
              </Menu>
            </InnerHeaderWrapper>
          </ContentWrapper>
        </Wrapper>
      )}
    </Container>
  </>
)
