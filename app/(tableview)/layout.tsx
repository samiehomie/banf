import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex mt-[25px] w-[1550px] h-[954px] 
    bg-white rounded-[12px] shadow-custom border border-[#ECEEF6] px-[30px] relative"
    >
      {children}
    </div>
  )
}

export default layout
