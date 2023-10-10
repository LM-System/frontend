import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import images from '@/public/images/index'

export default function Card({ courseId,id, title, semester, instructor}) {
  // console.log(courseId);
  // console.log(id, title, semester, instructor);
  return (
    <Link href={'/courses/'+courseId+ "/"+ id + '/main'}>
      <div className='p-4 shadow-md bg-gray-50 dark:bg-darkcomp rounded-lg'>
        <div className='flex flex-row gap-2 items-center'>
          <Image src={require('@/public/images/SVG/html.svg')} alt={title} width={'50'} height={'50'}/>
          <div>
            <h3 className='uppercase font-bold'>{title}</h3>
            <p>{instructor}</p>
          </div>
        </div>
        <div className='flex flex-row justify-end'>
          <p className='text-xs capitalize'>{semester}</p>
        </div>
      </div>
    </Link>
  )
}
