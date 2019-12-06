import styled from '@emotion/styled'
import * as format from 'date-fns/format'
import * as svLocale from 'date-fns/locale/sv'
import * as parse from 'date-fns/parse'
import * as React from 'react'
import { User } from '../server/utils/teamtailor'
import { DeferredImage } from './DeferredImage'

const PortraitContainer = styled('div')({
  width: 40,
  height: 40,
  borderRadius: '50%',
  overflow: 'hidden',
  position: 'relative',
  marginRight: 12,
})

const Portrait = styled(DeferredImage)({
  display: 'inline',
  margin: '0 auto !important',
  height: '100%',
  width: 'auto',
})

const AuthorContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 24,
  fontSize: 16,
})

const AuthorTextContainer = styled('div')({
  lineHeight: 1.3,
})

export const BlogPostAuthor: React.FunctionComponent<{
  author: User
  date: string
}> = ({ author, date }) => (
  <AuthorContainer>
    {author.picture.standard && (
      <PortraitContainer>
        <Portrait src={author.picture.standard} alt={author.name} />
      </PortraitContainer>
    )}
    <AuthorTextContainer>
      <div>
        {format(parse(date), 'DD MMMM YYYY', {
          locale: svLocale,
        })}
      </div>
      <div>{author.name}</div>
    </AuthorTextContainer>
  </AuthorContainer>
)
