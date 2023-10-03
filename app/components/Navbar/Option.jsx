'use client'
import Link from 'next/link'
// import { useRouter } from 'next/router'
import icons from '@/public/icons.jsx'
import { useEffect, useState } from 'react'

export default function Option({ id, route, title, icon }) {
  const {pathname} = window.location
  useEffect(() => {
    
  },[pathname])
  console.log(pathname, route)
  const active = pathname === route
  const classType = title === 'logout' ? 'logout' : 'navlink'
  const SVG = icons[title];
  return (
      <li className={`${classType} ${active ? 'active shadow-lg' : ''}`}>
        <Link
          href={route}
          className={'flex flex-col items-center justify-center gap-2'}
          >
          <SVG />
          <span className="capitalize font-bold text-xs">{title}</span>
        </Link>
      </li>
  )
}
