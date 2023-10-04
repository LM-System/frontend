import React from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import AboutusList from './AboutusList'

export default function AboutUs() {
  return (
    <div className='page'>
      <Navbar />
      <div className='main'>
        <AboutusList />
      </div>
    </div>
  )
}
