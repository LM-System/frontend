"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


export default function CourseBar({sectionId}) {
    const pathname = usePathname()
    const selected = pathname.split('/').pop()
    const upperNavContent = ['Main', 'Content', 'ClassList', 'Assignment', 'grades']
    return (
        <div className='w-full bg-white dark:bg-darkcomp shadow-lg rounded-lg'>
            <ul className='flex justify-around w-full pt-2'>
                {upperNavContent.map((item, i)=>{
                    return (<Link key={i} className='w-1/5' href={`/courses/${sectionId}/${item.toLowerCase()}`}><li className={` p-2 font-semibold text-sm text-center hover:text-gray-400 ${selected == item.toLowerCase()?' text-cyan-600 border-b-4 border-cyan-600 hover:opacity-70 hover:text-cyan-600 font-extrabold':''}`}>{item.toUpperCase()}</li></Link>)
                })}
            </ul>
        </div>
    );
}
