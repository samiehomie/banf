import React from 'react'
import { dummyData, dataType } from '@/public/data/dummyData'
import DataTable from '@/components/table-components/DataTable'
import WhiteBoard from '@/components/common/WhiteBoard'
import TableHeader from '@/components/table-components/TableHeader'
import Dropdown from '@/components/common/Dropdown'
import TableFooter from '@/components/table-components/TableFooter'
import Paging from '@/components/common/Paging'
import SearchInput from '@/components/common/SearchInput'

const columns = [
  'When (Start)',
  'Vehicle',
  'Driver/PM',
  'When (End)',
  'Location (End)',
  'Add Note',
  'Report / Note History'
]

const TableRow = ({ index, data }: { index: number; data: dataType }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-[32px] pr-[25px] text-center">{index + 1}</td>
      <td className="px-[25px] text-center">{data['When']}</td>
      <td className="px-[25px] text-center">{data['Vehicle']}</td>
      <td className="px-[25px] text-center">{data['Driver']}</td>
      <td className="px-[25px] text-center">{data['Location']}</td>
      <td className="px-[25px] text-center">{data['When']}5</td>
      <td className="px-[25px] text-center">{data['Location']}</td>
      <td className="px-[25px] text-center">
        <span className="inline-block bg-note" />
      </td>
      <td className="px-[25px] text-center">
        <span className="inline-block bg-history" />
      </td>
    </tr>
  )
}

function page() {
  return (
    <WhiteBoard>
      <TableHeader title="Route History">
        <Dropdown />
      </TableHeader>
      <DataTable columns={columns}>
        {dummyData.slice(0, 8).map((data, i) => (
          <TableRow key={i} index={i} data={data} />
        ))}
      </DataTable>
      <TableFooter>
        <SearchInput />
        <Paging />
      </TableFooter>
    </WhiteBoard>
  )
}

export default page
