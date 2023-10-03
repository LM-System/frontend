import React from 'react'
import Link from 'next/link'
import Option from './Option'
import icons from '@/public/icons.jsx'

export default function Logout() {
  return (
    <Option route="/login" title="logout" className="logout"/>
  )
}
