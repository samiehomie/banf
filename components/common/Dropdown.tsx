'use client'
import React, { useState, useEffect } from 'react'

function Dropdown() {
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    document.addEventListener('click', function handler(e) {
      if (
        e.target instanceof HTMLElement &&
        !e.target.matches('.sorts, .sorts *') &&
        expanded
      ) {
        setExpanded(false)
        document.removeEventListener('click', handler)
      }
    })
  }, [expanded])

  return (
    <div className="inline-block relative text-[14px] leading-[20px] tracking-[-0.1px]">
      <div
        className="sorts ml-[16px] h-[40px] w-[102px] rounded-[8px] shadow-custom
         relative hover:bg-gray-50
      "
      >
        <button
          type="button"
          aria-expanded="true"
          aria-haspopup="true"
          className="inline-block w-full text-left py-[10px] px-[16px]"
          onClick={() => setExpanded(!expanded)}
        >
          <span>Recent</span>
          <span
            aria-hidden="true"
            className="block bg-drop absolute right-[12px] top-1/2 -translate-y-1/2"
          />
        </button>
      </div>
      <div
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
        className={`${
          !expanded && 'hidden'
        } animation-up-50 absolute right-0 shadow-custom mt-[10px] bg-white z-50`}
      >
        <div role="none" className="w-[150px] rounded-[8px]">
          <div
            role="menuitem"
            tabIndex={-1}
            className="p-[10px] hover:bg-gray-50"
          >
            Recent
          </div>
          <div
            role="menuitem"
            tabIndex={-1}
            className="p-[10px] hover:bg-gray-50"
          >
            Driver
          </div>
          <div
            role="menuitem"
            tabIndex={-1}
            className="p-[10px] hover:bg-gray-50"
          >
            Location
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
