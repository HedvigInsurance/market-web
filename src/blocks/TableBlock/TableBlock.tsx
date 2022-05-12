import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'components/Table/Table'
import { SectionWrapper, ContentWrapper } from 'components/blockHelpers'
import { BaseBlockProps } from '../BaseBlockProps'

type TableBlockProps = BaseBlockProps & {
  table: any
}

export const TableBlock = ({ color, index, size, table }: TableBlockProps) => {
  return (
    <SectionWrapper colorComponent={color} size={size} brandPivot>
      <ContentWrapper brandPivot index={index}>
        <Table fullWidth>
          {table.thead && (
            <TableHead>
              <TableRow>
                {table.thead.map((cell: any, cellIndex: number) => (
                  <TableCell
                    key={cell._uid}
                    align={cellIndex === 0 ? 'left' : 'center'}
                  >
                    {cell.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          )}
          {table.tbody && (
            <TableBody>
              {table.tbody.map((row: any) => (
                <TableRow key={row._uid}>
                  {row.body.map((cell: any, cellIndex: number) => (
                    <TableCell
                      key={cell._uid}
                      align={cellIndex === 0 ? 'left' : 'center'}
                    >
                      {cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </ContentWrapper>
    </SectionWrapper>
  )
}
