'use client'
import React, { useState } from 'react'

function SearchInput() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="relative">
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
        className="py-[8px] px-[38px] h-[36px] w-[282px] text-[20px]
        rounded-[8px] border border-[#D0D5DD] bg-white focus:outline-blue-100"
        onInput={(e) => setInputValue(e.currentTarget.value)}
      />
    </div>
  )
}

export default SearchInput
