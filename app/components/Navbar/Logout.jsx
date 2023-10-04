import React from 'react'
import Link from 'next/link'
import Option from './Option'
import icons from '@/public/icons.jsx'

export default function Logout({route}) {
  return (
    <Option route={route} title="logout" type='logout' className="logout"/>
  )
}
