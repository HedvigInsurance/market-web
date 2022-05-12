import React from 'react'
import { renderComponent } from '../../test-utils'
import { Table, TableBody, TableCell, TableHead, TableRow } from './Table'

describe('Table', () => {
  it('can render', () => {
    const { container } = renderComponent(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>hello</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  it('can render table header', () => {
    const { container } = renderComponent(
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>hello</TableCell>
          </TableRow>
        </TableHead>
      </Table>,
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
