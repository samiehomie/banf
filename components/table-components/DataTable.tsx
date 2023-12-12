import React from 'react'

function DataTable({
  children,
  columns
}: {
  children: React.ReactNode
  columns: Array<string>
}) {
  return (
    <table className="leading-[16px] text-[12px] text-[#101828]">
      <thead>
        <tr>
          <th className="pb-[20px] pr-[25px] text-center">No</th>
          {columns.map((column, index) => (
            <th key={index} className="pb-[20px] px-[25px] text-center">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  )
}

export default DataTable
