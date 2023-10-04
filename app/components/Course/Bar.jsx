"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function CourseBar({courseId}) {
    const pathname = usePathname()
    const selected = pathname.split('/').pop()
    console.log(pathname,selected)
    // const [selected,setSelected] = useState('')
    const upperNavContent = ['Main', 'Content', 'ClassList', 'Assignment', 'grades']
    return (
        <div className='w-full bg-white shadow-lg'>
            <ul className='flex justify-around w-full border-b-2 pt-2'>
                {upperNavContent.map((item)=>{
                    return (<Link className='w-1/5' href={`/courses/${courseId}/${item.toLowerCase()}`}><li className={` p-2 font-semibold text-sm text-center hover:text-gray-400 ${selected == item.toLowerCase()?' text-cyan-600 border-b-4 border-cyan-600 hover:opacity-70 hover:text-cyan-600 font-extrabold':''}`}>{item.toUpperCase()}</li></Link>)
                })}
            </ul>
        </div>
    );
}
