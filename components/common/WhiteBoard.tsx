import React from 'react'

function WhiteBoard({
  children,
  extraStyle
}: {
  children: React.ReactNode
  extraStyle?: {}
}) {
  return (
    <section
      style={{ ...extraStyle }}
      className={`pl-[94px] relative mt-[25px] w-[1550px] h-[954px] bg-white rounded-[12px] 
  shadow-[0_20px_60px_0px_rgba(0,0,0,0.05)] border border-[#ECEEF6]`}
    >
      {children}
    </section>
  )
}

export default WhiteBoard
