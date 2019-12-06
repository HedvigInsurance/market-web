import styled from '@emotion/styled'
import * as React from 'react'

interface BreadcrumbProps {
  href?: string
}

const BreadcrumbComponent = styled('li')({
  display: 'inline-block',
  fontSize: '0.9rem',
  '&:not(:first-of-type):before': {
    content: '"\\203A"', // rsaquo
    display: 'inline-block',
    padding: '0 .75rem',
  },
})

export const Breadcrumb: React.SFC<BreadcrumbProps> = ({ href, children }) => (
  <BreadcrumbComponent>
    {href ? <a href={href}>{children}</a> : <span>{children}</span>}
  </BreadcrumbComponent>
)

export const Breadcrumbs = styled('ul')({
  listStyle: 'none',
  margin: 0,
  padding: 0,
})
