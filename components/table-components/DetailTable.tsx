'use client'
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Paging from '@/components/common/Paging'
import SearchInput from '@/components/common/SearchInput'
import Dropdown from '@/components/common/Dropdown'
import { dateFormatter } from '@/lib/tools'

function createData(
  when: string,
  vehicle: string,
  location: string,
  riskLevel: string,
  resolved: boolean,
  completed?: string
) {
  return { when, vehicle, location, riskLevel, resolved, completed }
}

const BasicTable = ({
  title,
  response
}: {
  title: string
  response: notionPage[]
}) => {
  const [sort, setSort] = useState<'when' | 'vehicle' | 'riskLevel'>('when')
  const rows = response
    .slice(0, 9)
    .map((data) =>
      createData(
        data.properties.when['rich_text'][0].text.content,
        data.properties.vehicle.title[0].text.content,
        data.properties.location['rich_text'][0].text.content,
        data.properties.riskLevel.select.name,
        data.properties.resolved.checkbox,
        data.properties.completed.date?.start
      )
    )
    .sort((prev, next) => {
      const prevValue = sort === 'when' ? new Date(prev[sort]) : prev[sort]
      const nextValue = sort === 'when' ? new Date(next[sort]) : next[sort]

      if (prevValue < nextValue) {
        return -1
      }
      if (prevValue > nextValue) {
        return 1
      }
      return 0
    })
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          ':first-of-type': { paddingRight: '30px' },
          ':last-of-type': { paddingLeft: '30px' },
          borderRadius: '12px'
        }}
      >
        <header className="flex items-center justify-between px-[10px] relative top-[10px]">
          <h2 className="title">{title}</h2>
          <div>
            <span className="text-[13px] tracking-[-0.1px] leading-[18px]">
              Sort by
            </span>
            <Dropdown sort={sort} setSort={setSort} />
          </div>
        </header>
        <Table
          sx={{
            width: '100%',

            'td, th': {
              border: 0,
              fontSize: '12px',
              fontFamily: '__Inter_e66fe9',
              paddingTop: '24px',
              paddingBottom: '24px'
            },
            th: { fontWeight: 700 }
          }}
          padding="none"
          size="small"
          stickyHeader={true}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">When</TableCell>
              <TableCell align="center">Vehicle</TableCell>
              <TableCell align="center">Location</TableCell>
              <TableCell align="center">Risk Level</TableCell>
              <TableCell align="center">Resolved?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} hover={true}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{row.when}</TableCell>
                <TableCell align="center">{row.vehicle}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">{row.riskLevel}</TableCell>
                <TableCell
                  align="center"
                  sx={{ display: 'flex', justifyContent: 'space-evenly' }}
                >
                  {!row.resolved ? (
                    <>
                      <button className="block bg-check" />
                      <button className="block bg-remove" />
                    </>
                  ) : (
                    dateFormatter(row.completed)
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between pl-[5px] pr-[10px]">
          <SearchInput />
          <Paging />
        </div>
      </TableContainer>
    </>
  )
}

export default function DetailTable({ response }: { response: notionPage[] }) {
  return (
    <div
      className="flex mt-[25px] w-[1550px] h-[954px] bg-white rounded-[12px] 
    shadow-custom border border-[#ECEEF6] px-[30px] relative"
    >
      <BasicTable title="Pothole History" response={response} />
      <div
        className="h-[862px] w-[5px] bg-[#C4C4C4] absolute z-50 
      top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
      <BasicTable
        title="Road Temperature / Slippery Road History"
        response={response}
      />
    </div>
  )
}
