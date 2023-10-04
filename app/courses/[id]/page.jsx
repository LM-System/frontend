import React from 'react'
import CourseTabs from '@/app/components/Course/Tabs'
import Navbar from '@/app/components/Navbar/Navbar'

export default function Section() {
  return (
    <>
      <div className='page'>
        <Navbar/>
        <div className='main'>
          <CourseTabs/>
          <div>Section</div>
        </div>
      </div>
    </>
  )
}
