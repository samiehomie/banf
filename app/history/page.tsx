import React from 'react'
import SearchInput from '@/components/common/SearchInput'
import Paging from '@/components/common/Paging'
import Dropdown from '@/components/common/Dropdown'
import { dummyData, dataType } from '@/public/data/dummyData'

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
    <>
      <section
        className="pl-[94px] mt-[25px] w-[1550px] h-[954px] bg-white rounded-[12px] 
    shadow-[0_20px_60px_0px_rgba(0,0,0,0.05)] border border-[#ECEEF6]"
      >
        <header className="h-[130px]">
          <h2 className="inline-block title pt-[47px] ml-[-35px]">
            Route History
          </h2>
          <div className="inline-block">
            <span className="text-[13px] tracking-[-0.1px] ml-[374px] leading-[18px]">
              Sort by
            </span>
            <Dropdown />
          </div>
        </header>
        <table className="leading-[16px] text-[12px] text-[#101828]">
          <thead>
            <tr>
              <th className="pb-[20px] pr-[25px] text-center">No</th>
              <th className="pb-[20px] px-[25px] text-center">When (Start)</th>
              <th className="pb-[20px] px-[25px] text-center">Vehicle</th>
              <th className="pb-[20px] px-[25px] text-center">Driver/PM</th>
              <th className="pb-[20px] px-[25px] text-center">
                Location (Start)
              </th>
              <th className="pb-[20px] px-[25px] text-center">When (End)</th>
              <th className="pb-[20px] px-[25px] text-center">
                Location (End)
              </th>
              <th className="pb-[20px] px-[25px] text-center">Add Note</th>
              <th className="pb-[20px] px-[25px] text-center">
                Report / Note History
              </th>
            </tr>
          </thead>
          <tbody>
            {dummyData.slice(0, 8).map((data, i) => (
              <TableRow key={i} index={i} data={data} />
            ))}
          </tbody>
        </table>
        <section className="mt-[45px] ml-[-35px] flex">
          <SearchInput />
          <Paging />
        </section>
      </section>
    </>
  )
}

export default page
