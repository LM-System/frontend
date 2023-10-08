"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '@/app/components/Navbar/Navbar'
import Link from 'next/link'
import {GrAdd} from 'react-icons/gr'
import {AiOutlineClose,AiOutlineMinus} from 'react-icons/ai'
import { axiosHandler } from '@/public/Utilities/axiosHandler'
import AddSection from '@/app/components/section/AddSection'

function Department({params}) {
  const instituteId = params.instituteId
  const departmentId = params.departmentId
  const courseId = params.courseId
    const [fetchingError,setFetchingError]=useState('')
    const [isAdding,setIsAdding] = useState(false)
    const [sections,setSections]=useState([])

    const handleDelete = async (id)=>{
        try{
            await axiosHandler('DELETE',`/section/${id}`)
            fetchData()
        }catch(e){setFetchingError(e.message)}
    }
    
    const fetchData = async ()=>{
        try{
            const data=await axiosHandler('GET',`/coursesections/${courseId}`)
            setSections(data.rows)
        }catch(e){setFetchingError(e.message)}
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='page'>
    {isAdding&&<AddSection refreshData={fetchData} courseId={courseId} departmentId={departmentId} setIsAdding={setIsAdding}/>}
        <Navbar/>
        <main className='main'>
        {fetchingError&& <p className='text-lg text-red-600 bottom-1/2 left-1/4 font-bold absolute text-center z-10'>{fetchingError}, Please refresh the page</p>}
            <div>
                
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    {!isAdding&&<GrAdd onClick={()=>{setIsAdding(true)}} className='absolute right-3 top-3 text-lg cursor-pointer'/>}
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Section ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Instructor
                </th>
                <th scope="col" class="px-6 py-3">
                    year
                </th>
                <th scope="col" class="px-6 py-3">
                    semester
                </th>
                <th scope="col" class="px-6 py-3">
                    status
                </th>
                <th scope="col" class="px-6 py-3">
                    capacity
                </th>
                <th scope="col" class="px-6 py-3">
                    Announcement
                </th>
                <th scope="col" class="px-6 py-3">
                    Content
                </th>
            </tr>
        </thead>
        <tbody>
            {sections?.map((section)=>{
                return(
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap dark:text-white">
                   {section.id}
                </th>
                <td class="px-6 py-4">
                    {section.name}
                </td>
                <td class="px-6 py-4">
                    {section.instructor?.name}
                </td>
                <td class="px-6 py-4">
                    {section.year}
                </td>
                <td class="px-6 py-4">
                    {section.semester}
                </td>
                <td class="px-6 py-4">
                    {section.status}
                </td>
                <td class="px-6 py-4">
                    {section.capacity}
                </td>
                <td class="px-6 py-4  text-blue-700">
                    <Link href={`/institutions/${instituteId}/departments/${departmentId}/courses/${courseId}/sections/${section.id}/announcement`}>Announcement</Link>
                </td>
                <td class="px-6 py-4  text-blue-700">
                    <Link href={`/institutions/${instituteId}/departments/${departmentId}/courses/${courseId}/sections/${section.id}/content`}>Content</Link>
                </td>
                <AiOutlineMinus onClick={()=>{
                    handleDelete(section.id)
                }} className='text-lg absolute right-4 mt-3 text-black cursor-pointer'/>
            </tr>
                )
            })}
        </tbody>
    </table>
</div>

            </div>
        </main>
        </div>
  )
}

export default Department