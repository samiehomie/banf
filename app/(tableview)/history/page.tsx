import React from 'react'
import fetchJson from '@/lib/fetchJson'
import PaginatedItems from '@/components/common/PaginatedItmes'

export default async function Page() {
  const response = await fetchJson<notionPageHistory[]>(
    `${process.env.NEXT_PUBLIC_FRONT_URL}/api/query`,
    {
      next: { tags: [`history`] },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        databaseId: process.env.NOTION_DATABASE_ID3 as string
      })
    }
  )
  return (
    <PaginatedItems
      title="Route History"
      items={response}
      itemsPerPage={8}
      extraStyle={{
        paddingLeft: '50px',
        paddingRight: '15px',
        paddingBottom: '60px'
      }}
    />
  )
}

export const revalidate = 3600

// import React from 'react'
// import { dummyData, dataType } from '@/public/data/dummyData'
// import WhiteBoard from '@/components/common/WhiteBoard'

// const columns = [
//   'When (Start)',
//   'Vehicle',
//   'Driver/PM',
//   'Location (Start)',
//   'When (End)',
//   'Location (End)',
//   'Add Note',
//   'Report / Note History'
// ]

// const TableRow = ({ index, data }: { index: number; data: dataType }) => {
//   return (
//     <tr className="hover:bg-gray-50">
//       <td className="py-[32px] pr-[25px] text-center">{index + 1}</td>
//       <td className="px-[25px] text-center">{data['When']}</td>
//       <td className="px-[25px] text-center">{data['Vehicle']}</td>
//       <td className="px-[25px] text-center">{data['Driver']}</td>
//       <td className="px-[25px] text-center">{data['Location']}</td>
//       <td className="px-[25px] text-center">{data['When']}5</td>
//       <td className="px-[25px] text-center">{data['Location']}</td>
//       <td className="px-[25px] text-center">
//         <span className="inline-block bg-note" />
//       </td>
//       <td className="px-[25px] text-center">
//         <span className="inline-block bg-history" />
//       </td>
//     </tr>
//   )
// }

// function page() {
//   return (
//     <WhiteBoard>
//       <div />
//       {/* <TableHeader title="Route History">
//         <Dropdown />
//       </TableHeader>
//       <DataTable columns={columns}>
//         {dummyData.slice(0, 8).map((data, i) => (
//           <TableRow key={i} index={i} data={data} />
//         ))}
//       </DataTable>
//       <TableFooter>
//         <SearchInput />
//         <Paging />
//       </TableFooter> */}
//     </WhiteBoard>
//   )
// }

// export default page
