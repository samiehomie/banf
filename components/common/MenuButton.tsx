'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MenuButton({
  path,
  bgClass,
  label
}: {
  path: string
  bgClass: string
  label: string
}) {
  const pathname = usePathname()
  const active = pathname === path
  const currentBgClass = active ? bgClass + '_active' : bgClass

  return (
    <Link
      href={path}
      className={`w-full h-[45px] rounded-[8px] flex items-center text-center
            font-normal px-[15px] my-[35px] ${active && 'bg-[#005EAD]'}`}
    >
      <span className="block min-w-[35px] h-full relative">
        <span
          className={`block ${bgClass} absolute ${active && 'bg-active'}
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
        />
      </span>

      <span
        className={`${
          active ? 'text-white' : 'text-[#101828]'
        } text-[20px] font-semibold block w-full tracking-[-0.01em] `}
      >
        {label}
      </span>
    </Link>
  )
}
