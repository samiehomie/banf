'use client'
import React from 'react'

function SearchInput({
  inputValue,
  setInputValue,
  extraStyle,
  setItemOffset,
  onChange,
  ref
}: {
  inputValue: string
  setInputValue: (onSearch: string) => void
  extraStyle?: {}
  setItemOffset?: (offset: number) => void
  onChange?: (arg: any) => void
  ref?: React.RefObject<HTMLInputElement>
}) {
  return (
    <div
      className={`relative h-[36px] w-[282px] rounded-[8px] border border-[#D0D5DD] bg-white`}
      style={{ ...extraStyle }}
    >
      <label
        htmlFor="search"
        className={`inline-block bg-search_black absolute 
        left-[13px] top-1/2 -translate-y-1/2 ${
          inputValue.length > 0 && 'hidden'
        }`}
      />
      <input
        ref={ref}
        id="search"
        type="text"
        placeholder="Search Location"
        className="py-[8px] px-[39px] h-full w-full text-[20px] bg-transparent focus:outline-none"
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput
