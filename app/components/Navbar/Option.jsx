'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import icons from '@/public/icons.jsx'
import { useEffect, useState } from 'react'

export default function Option({ id, route, title, icon, type }) {
  const pathname = usePathname().split('/')[1]
  const active = `/${pathname}` === route
  const SVG = icons[title];
  return (
        <Link
          href={route}
          className={`${type} ${active ? 'active' : ''}`}
          >
          <SVG />
          <span className="capitalize font-bold text-xs hidden md:inline-block">{title}</span>
        </Link>
  )
}
