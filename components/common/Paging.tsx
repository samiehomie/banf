'use client'
import React from 'react'

function Paging() {
  return (
    <div className="flex justify-between w-[315px] h-[32px] items-center ml-[86px]">
      <button className="block relative w-[32px] h-[32px] rounded-[50px] shadow-custom">
        <span className="block bg-prev absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </button>
      <ul className="flex justify-between w-[85%] px-[40px] text-[12px] tracking-[-0.1px]">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>...</li>
        <li>12</li>
      </ul>
      <button className="block relative w-[32px] h-[32px] rounded-[50px] shadow-custom">
        <span className="block bg-next absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </button>
    </div>
  )
}

export default Paging
