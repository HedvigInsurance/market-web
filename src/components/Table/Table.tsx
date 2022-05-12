import styled from '@emotion/styled'
import React, { createContext, ReactNode, useContext } from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { getMargins, Margins } from '../../utils/margins'
import { TABLET_BP_UP } from '../blockHelpers'

type WithChildrenProps = {
  children?: ReactNode
}

export type TableProps = {
  minWidth?: string
  maxWidth?: string
  fullWidth?: boolean
} & Margins

const Table = styled.table(
  ({ minWidth, maxWidth, fullWidth, ...props }: TableProps) => ({
    borderCollapse: 'collapse',
    borderSpacing: 0,
    minWidth,
    maxWidth,
    width: fullWidth ? '100%' : 'auto',
    ...getMargins(props),
  }),
)

const TableHeadElement = styled.thead()
// This context is used to conditionally render a `th` inside `thead` elements, and `td` otherwise
const TableHeadContext = createContext(false)

const TableHead = ({ children }: WithChildrenProps) => {
  return (
    <TableHeadContext.Provider value={true}>
      <TableHeadElement>{children}</TableHeadElement>
    </TableHeadContext.Provider>
  )
}

const TableRow = styled.tr()

const TableBody = styled.tbody()

const getTableCellStyles = ({ align = 'left', color }: TableCellProps) => ({
  textAlign: align,
  color,
})

type TableCellProps = WithChildrenProps & {
  align?: 'center' | 'left' | 'right'
  color?: keyof typeof colorsV3 | undefined | string
}

const TableCellElement = styled.td((props: TableCellProps) => ({
  ...getTableCellStyles(props),
  padding: '0.5rem 0.5rem',

  [TABLET_BP_UP]: {
    padding: '0.5rem 1rem',
  },

  borderBottom: `1px solid ${colorsV3.gray300}`,
}))

const TableHeadCellElement = styled.th(
  (props: Omit<TableCellProps, 'color'>) => ({
    ...getTableCellStyles(props),
    padding: '1rem 0.5rem',
    fontSize: '0.875rem',
    fontWeight: 'normal',
    color: colorsV3.gray700,

    [TABLET_BP_UP]: {
      padding: '1rem',
    },
  }),
)

const TableCell = ({ children, ...props }: TableCellProps) => {
  const context = useContext(TableHeadContext)

  // Render a `th` when inside a `thead` and `td` otherwise
  if (context) {
    return <TableHeadCellElement {...props}>{children}</TableHeadCellElement>
  }

  return <TableCellElement {...props}>{children}</TableCellElement>
}

export { Table, TableHead, TableRow, TableCell, TableBody }
