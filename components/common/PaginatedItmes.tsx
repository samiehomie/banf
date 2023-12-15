'use client'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { DetailTable, HistoryTable } from '../table-components/DataTables'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import SearchInput from '@/components/common/SearchInput'

function isNotionPageDetail(
  items: notionPageDetail[] | notionPageHistory[]
): items is notionPageDetail[] {
  return (items as notionPageDetail[])[0].properties.riskLevel !== undefined
}
function isSideDefined(
  side: 'left' | 'right' | undefined
): side is 'left' | 'right' {
  return side !== undefined
}

function PaginatedItems({
  title,
  items,
  itemsPerPage,
  extraStyle
}: {
  title: string
  items: notionPageHistory[]
  itemsPerPage: number
  extraStyle?: {}
}): React.ReactNode
function PaginatedItems({
  title,
  items,
  itemsPerPage,
  extraStyle
}: {
  title: string
  items: notionPageDetail[]
  itemsPerPage: number
  extraStyle?: {}
}): React.ReactNode

function PaginatedItems({
  title,
  items,
  itemsPerPage,
  extraStyle
}: {
  title: string
  items: notionPageDetail[] | notionPageHistory[]
  itemsPerPage: number
  extraStyle?: {}
}) {
  const [itemOffset, setItemOffset] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const endOffset = itemOffset + itemsPerPage

  const itemsFiltered = items.filter((item) => {
    if (inputValue.length > 0) {
      return item.properties.location['rich_text'][0].plain_text.startsWith(
        inputValue
      )
    }
    return item
  })

  const currentItems = itemsFiltered.slice(itemOffset, endOffset)
  const pageCount = Math.ceil(itemsFiltered.length / itemsPerPage)

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length
    setItemOffset(newOffset)
  }

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: '12px',
        ...extraStyle
      }}
    >
      {isNotionPageDetail(items) ? (
        <DetailTable
          title={title}
          response={currentItems as notionPageDetail[]}
          startNumber={itemOffset}
          itemsPerPage={itemsPerPage}
        />
      ) : (
        <HistoryTable
          title={title}
          response={currentItems as notionPageHistory[]}
          startNumber={itemOffset}
          itemsPerPage={itemsPerPage}
        />
      )}

      <div className={`${isNotionPageDetail(items) ? 'flex justify-between pl-[5px] pr-[10px]' : 'flex pt-[30px] ml-[-30px]'}`}>
        <SearchInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          setItemOffset={setItemOffset}
        />
        <ReactPaginate
          key={inputValue}
          breakLabel="..."
          previousLinkClassName="block relative w-[32px] h-[32px] rounded-[50px] shadow-custom"
          previousLabel={
            <span className="block bg-prev absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          }
          nextLinkClassName="block relative w-[32px] h-[32px] rounded-[50px] shadow-custom"
          nextLabel={
            <span className="block bg-next absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          }
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName={`flex justify-between w-[315px] h-[32px] items-center ${!isNotionPageDetail(items) && 'ml-[86px]'}`}
          pageClassName="block text-[12px] tracking-[-0.1px]"
          activeLinkClassName="text-[#1192FF]"
        />
      </div>
    </TableContainer>
  )
}

export default PaginatedItems
