import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import styled from '@emotion/styled'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from 'components/Table/Table'
import {
  SectionWrapper,
  ContentWrapper,
  TABLET_BP_UP,
} from 'components/blockHelpers'
import { Tick } from 'components/icons/Tick'
import { Dash } from 'components/icons/Dash'
import { Heading } from 'components/Heading/Heading'
import { BaseBlockProps } from '../BaseBlockProps'

type TableCell = {
  value: string
  _uid: string
}

type TableRow = {
  body: TableCell[]
  _uid: string
}

type TableType = {
  thead: TableCell[]
  tbody: TableRow[]
}

type TableBlockProps = BaseBlockProps & {
  title?: string
  text?: string
  table: TableType
}

const TableHeader = styled.div({
  '&:not(:empty)': {
    marginBottom: '1rem',

    [TABLET_BP_UP]: {
      marginBottom: '2rem',
    },
  },
})

const Text = styled.p({
  fontSize: '1rem',
  textAlign: 'center',
})

const getCellIcon = (cell: string) => {
  return Number(cell) ? <Tick /> : <Dash fill={colorsV3.gray400} />
}

export const TableBlock = ({
  color,
  index,
  text,
  size,
  title,
  table,
}: TableBlockProps) => {
  return (
    <SectionWrapper colorComponent={color} size={size} brandPivot>
      <ContentWrapper brandPivot index={index}>
        <TableHeader>
          {title && (
            <Heading as="h3" mobileSize="sm" size="xs" textPosition="center">
              {title}
            </Heading>
          )}
          {text && <Text>{text}</Text>}
        </TableHeader>
        <Table fullWidth>
          {table.thead && (
            <TableHead>
              <TableRow>
                {table.thead.map((cell: TableCell, cellIndex: number) => (
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
              {table.tbody.map((row: TableRow) => (
                <TableRow key={row._uid}>
                  {row.body.map((cell: TableCell, cellIndex: number) => (
                    <TableCell
                      key={cell._uid}
                      align={cellIndex === 0 ? 'left' : 'center'}
                    >
                      {cellIndex === 0 ? cell.value : getCellIcon(cell.value)}
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
