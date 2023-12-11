import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import avatarDefault from '@/public/assets/avatar-default.png'

function Avatar() {
  return (
    <Link href="#">
      <Image src={avatarDefault} alt="avatar" className="rounded-full" />
    </Link>
  )
}

export default Avatar
