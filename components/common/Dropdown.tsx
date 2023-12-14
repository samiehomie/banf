'use client'
import React, { useState, useEffect } from 'react'

function Dropdown({
  sort,
  setSort
}: {
  sort: string
  setSort: (arg: 'when' | 'vehicle' | 'riskLevel') => void
}) {
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
  const sortSelected =
    sort === 'when' ? 'Recent' : sort === 'riskLevel' ? 'Risk Level' : 'Vehicle'
  return (
    <div className="inline-block relative text-[14px] leading-[20px] tracking-[-0.1px]">
      <div
        className="sorts ml-[16px] h-[40px] w-[117px] rounded-[8px] shadow-custom
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
          <span>{sortSelected}</span>
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
            onClick={() => setSort('when')}
          >
            Recent
          </div>
          <div
            role="menuitem"
            tabIndex={-1}
            className="p-[10px] hover:bg-gray-50"
            onClick={() => setSort('vehicle')}
          >
            Vehicle
          </div>
          <div
            role="menuitem"
            tabIndex={-1}
            className="p-[10px] hover:bg-gray-50"
            onClick={() => setSort('riskLevel')}
          >
            Risk Level
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dropdown
