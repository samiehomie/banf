import React from 'react'
import Logo from './Logo'
import Avatar from './Avatar'
import Link from 'next/link'

function SiteHeader() {
  return (
    <header
      className="float bg-white top-0 w-full
                h-[60px] py-[8px] px-[24px] drop-shadow-sm"
    >
      <div
        className="max-w-[1920px] mx-auto flex flex-row 
                    justify-between items-center"
      >
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex justify-between w-[98.6px] items-center">
          <div className="bg-active_bell">
            <span className="screen-out">알림</span>
          </div>
          <Avatar />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
