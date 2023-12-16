'use client'
import React, { FormEvent } from 'react'
import { debounce } from 'lodash'

function SearchInput({
  inputValue,
  setInputValue,
  extraStyle,
  setItemOffset
}: {
  inputValue: string
  setInputValue: (onSearch: string) => void
  extraStyle?: {}
  setItemOffset?: (offset: number) => void
}) {
  const onInput = debounce(function (e: FormEvent<HTMLInputElement>) {
    if (e.target && e.target instanceof HTMLInputElement) {
      setInputValue(e.target.value)
      if (setItemOffset) setItemOffset(0)
    }
  }, 200)

  return (
    <div
      className={` relative h-[36px] w-[282px] rounded-[8px] border border-[#D0D5DD] bg-white`}
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
        id="search"
        type="text"
        placeholder="Search Location"
        className="py-[8px] px-[39px] h-full w-full text-[20px] bg-transparent focus:outline-none"
        onChange={onInput}
      />
    </div>
  )
}

export default SearchInput
