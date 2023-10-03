'use client'
import React from 'react'
import Option from './Option'
import { ThemeProvider } from "next-themes";
import ThemeButton from './ThemeButton'
import Logout from './Logout'

const NavLinks = [
  {
    title: 'home',
    route: '/'
  },
  {
    title: 'courses',
    route: '/courses'
  },
  {
    title: 'profile',
    route: '/profile'
  },
]

export default function Navbar() {
  return (
    <ThemeProvider attribute='class'>
      <nav className='nav'>
        <ul className='flex md:flex-col items-center gap-2'>
          {NavLinks.map((e, i) => <Option id={i} key={i} {...e} />)}
        </ul>
        <ul className='flex md:flex-col items-center gap-4'>
          <ThemeButton />
          <Logout route={'/login'} />
        </ul>
      </nav>
    </ThemeProvider>
  )
}
