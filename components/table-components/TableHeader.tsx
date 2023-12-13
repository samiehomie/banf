import React from 'react'

function TableHeader({
  children,
  title,
  extraStyle
}: {
  children?: React.ReactNode
  title: string
  extraStyle?: {}
}) {
  return (
    <header className="h-[130px]">
      <h2
        className="inline-block title pt-[47px] ml-[-35px]"
        style={{ ...extraStyle }}
      >
        {title}
      </h2>
      <div className="inline-block">
        <span className="text-[13px] tracking-[-0.1px] ml-[374px] leading-[18px]">
          Sort by
        </span>
        {children}
      </div>
    </header>
  )
}

export default TableHeader
