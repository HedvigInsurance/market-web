import styled from '@emotion/styled'
import * as React from 'react'
import { ContentWrapper } from '../components/blockHelpers'
import { getStoryblokImage, Image as ImageType } from '../utils/storyblok'
import { BaseBlockProps } from './BaseBlockProps'

const Wrapper = styled('div')({
  textAlign: 'center',
  fontSize: 0,
})
const Image = styled('img')({
  maxHeight: 100,
  width: 'auto',
})

interface MediaLogosBlockProps extends BaseBlockProps {
  media_logos: ImageType
}

export const MediaLogosBlock: React.FunctionComponent<MediaLogosBlockProps> = ({
  media_logos,
}) => (
  <Wrapper>
    <ContentWrapper>
      <Image src={getStoryblokImage(media_logos)} />
    </ContentWrapper>
  </Wrapper>
)
