'use client'
import React, { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Dropdown from '@/components/common/Dropdown'
import { dateFormatter } from '@/lib/tools'
import fetchJson from '@/lib/fetchJson'
import { revalidateTagAction } from '@/lib/actions'

function createDetailData(
  pageId: string,
  when: string,
  vehicle: string,
  location: string,
  riskLevel: string,
  resolved: boolean,
  completed?: string
) {
  return { pageId, when, vehicle, location, riskLevel, resolved, completed }
}

function createHistoryData(
  pageId: string,
  when: string,
  when_end: string,
  vehicle: string,
  location: string,
  location_end: string,
  driver: string
) {
  return { pageId, when, vehicle, location, location_end, driver, when_end }
}

export const DetailTable = ({
  title,
  response,
  startNumber,
  itemsPerPage
}: {
  title: string
  response: notionPageDetail[]
  startNumber: number
  itemsPerPage: number
}) => {
  const [sort, setSort] = useState<'when' | 'vehicle' | 'riskLevel'>('when')
  const rows = response
    .map((data) =>
      createDetailData(
        data.id,
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
            <TableRow key={row.pageId} hover={true}>
              <TableCell align="center">{index + startNumber + 1}</TableCell>
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
                    <button
                      className="block bg-check"
                      onClick={async () => {
                        await fetchJson(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/query`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            pageId: row.pageId
                          })
                        })
                        await revalidateTagAction('detail')
                      }}
                    />
                    <button
                      className="block bg-remove"
                      onClick={async () => {
                        await fetchJson(`${process.env.NEXT_PUBLIC_FRONT_URL}/api/remove`, {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            pageId: row.pageId
                          })
                        })
                        await revalidateTagAction('detail')
                      }}
                    />
                  </>
                ) : (
                  dateFormatter(row.completed)
                )}
              </TableCell>
            </TableRow>
          ))}
          {response.length < itemsPerPage && (
            <TableRow
              sx={{
                height: `${65.12 * (itemsPerPage - response.length)}px`
              }}
            ></TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
export const HistoryTable = ({
  title,
  response,
  startNumber,
  itemsPerPage
}: {
  title: string
  response: notionPageHistory[]
  startNumber: number
  itemsPerPage: number
}) => {
  const [sort, setSort] = useState<'when' | 'vehicle' | 'driver'>('when')
  const rows = response
    .map((data) =>
      createHistoryData(
        data.id,
        data.properties.when['rich_text'][0].text.content,
        data.properties.vehicle.title[0].text.content,
        data.properties.location['rich_text'][0].text.content,
        data.properties['location_end']['rich_text'][0].text.content,
        data.properties['when_end']['rich_text'][0].text.content,
        data.properties.driver['rich_text'][0].text.content
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
      <header className="flex items-center justify-start ml-[-30px] pt-[25px]">
        <h2 className="title">{title}</h2>
        <div className="pl-[374px]">
          <span className="text-[13px] tracking-[-0.1px] leading-[18px]">
            Sort by
          </span>
          <Dropdown sort={sort} setSort={setSort} />
        </div>
      </header>
      <Table
        sx={{
          'td, th': {
            border: 0,
            fontSize: '12px',
            fontFamily: '__Inter_e66fe9'
          },
          td: {
            paddingTop: '21px',
            paddingBottom: '21px'
          },
          th: { fontWeight: 700, paddingBottom: '20px', paddingTop: '40px' }
        }}
        padding="none"
        size="small"
        stickyHeader={true}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">No</TableCell>
            <TableCell align="center">When (Start)</TableCell>
            <TableCell align="center">Vehicle</TableCell>
            <TableCell align="center">Driver/PM</TableCell>
            <TableCell align="center">Location (Start)</TableCell>
            <TableCell align="center">When (End)</TableCell>
            <TableCell align="center">Location (End)</TableCell>
            <TableCell align="center">Add Note</TableCell>
            <TableCell align="center">Report / Note History</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.pageId} hover={true}>
              <TableCell align="center">{index + startNumber + 1}</TableCell>
              <TableCell align="center">{row.when}</TableCell>
              <TableCell align="center">{row.vehicle}</TableCell>
              <TableCell align="center">{row.driver}</TableCell>
              <TableCell align="center">{row.location}</TableCell>
              <TableCell align="center">{row.when_end}</TableCell>
              <TableCell align="center">{row.location_end}</TableCell>
              <TableCell align="center">
                <span className="inline-block bg-note" />
              </TableCell>
              <TableCell align="center">
                <span className="inline-block bg-history" />
              </TableCell>
            </TableRow>
          ))}
          {response.length < itemsPerPage && (
            <TableRow
              sx={{
                height: `${65.12 * (itemsPerPage - response.length)}px`
              }}
            ></TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
// export default function DetailTable({
//   response,
// }: {
//   response: notionPage[]
// }) {
//   return (
//     <div
//       className="flex mt-[25px] w-[1550px] h-[954px] bg-white rounded-[12px]
//     shadow-custom border border-[#ECEEF6] px-[30px] relative"
//     >
//       <BasicTable title="Pothole History" response={response} />
//       <div
//         className="h-[862px] w-[5px] bg-[#C4C4C4] absolute z-50
//       top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
//       />
//       <BasicTable
//         title="Road Temperature / Slippery Road History"
//         response={response}
//       />
//     </div>
//   )
// }
