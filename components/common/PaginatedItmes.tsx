'use client'
import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { BasicTable } from '../table-components/DetailTable'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import SearchInput from '@/components/common/SearchInput'

export default function PaginatedItems({
  title,
  items,
  itemsPerPage
}: {
  title: string
  items: notionPage[]
  itemsPerPage: number
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
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        ':first-of-type': { paddingRight: '30px' },
        ':last-of-type': { paddingLeft: '30px' },
        borderRadius: '12px'
      }}
    >
      <BasicTable
        title={title}
        response={currentItems}
        startNumber={itemOffset}
      />
      <div className="flex justify-between pl-[5px] pr-[10px]">
        <SearchInput inputValue={inputValue} setInputValue={setInputValue} />
        <ReactPaginate
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
          containerClassName="flex justify-between w-[315px] h-[32px] items-center"
          pageClassName="block text-[12px] tracking-[-0.1px]"
          activeLinkClassName="text-[#1192FF]"
        />
      </div>
    </TableContainer>
  )
}
