import React from 'react'
import { colorsV3 } from '@hedviginsurance/brand'
import { Tick } from '../icons/Tick'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableProps,
  TableRow,
} from './Table'

export default {
  title: 'Components/Table',
  component: Table,
  parameters: {
    paddings: [
      { name: 'Medium', value: '32px' },
      { name: 'Large', value: '64px', default: true },
    ],
  },
}

function createDataCarInsuranceData(
  name: string,
  traffic: boolean,
  half: boolean,
  full: boolean,
) {
  return { name, traffic, half, full }
}

const comparisonRows = [
  createDataCarInsuranceData('Personskador', true, true, true),
  createDataCarInsuranceData('Skador på annans egendom', true, true, true),
  createDataCarInsuranceData('Stöld och inbrott', false, true, true),
  createDataCarInsuranceData('Brand', false, true, true),
  createDataCarInsuranceData('Glasskador', false, true, true),
  createDataCarInsuranceData('Bärgning', false, true, true),
  createDataCarInsuranceData('Skador på bilen från olycka', false, false, true),
]

const premiumRows = [
  createDataCarInsuranceData('Personskador', false, true, true),
  createDataCarInsuranceData('Skador på annans egendom', false, true, true),
]

const tableProps: TableProps = {
  minWidth: '650px',
}

export const Default = () => (
  <>
    <Table {...tableProps}>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell align="center">Trafik</TableCell>
          <TableCell align="center">Halv</TableCell>
          <TableCell align="center">Hel</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {comparisonRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell
              align="center"
              color={row.traffic ? undefined : colorsV3.gray400}
            >
              {row.traffic ? <Tick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.half ? undefined : colorsV3.gray400}
            >
              {row.half ? <Tick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.full ? undefined : colorsV3.gray400}
            >
              {row.full ? <Tick /> : <>&mdash;</>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Table {...tableProps} mt="2rem">
      <TableHead>
        <TableRow>
          <TableCell>ENDAST MED PREMIUM</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {premiumRows.map((row) => (
          <TableRow key={row.name}>
            <TableCell>{row.name}</TableCell>
            <TableCell
              align="center"
              color={row.traffic ? undefined : colorsV3.gray400}
            >
              {row.traffic ? <Tick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.half ? undefined : colorsV3.gray400}
            >
              {row.half ? <Tick /> : <>&mdash;</>}
            </TableCell>
            <TableCell
              align="center"
              color={row.full ? undefined : colorsV3.gray400}
            >
              {row.full ? <Tick /> : <>&mdash;</>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
)
